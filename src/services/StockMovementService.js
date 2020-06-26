import SaleService from "./SaleService";
import PurchaseService from "./PurchaseService";
import database from "../models/database";
import BranchProductStock from "../models/branchesProductsStocks/BranchProductStock";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import SaleEntries from "../models/saleEntry/SaleEntries";
import StockMovement from "../models/stockMovements/StockMovement";
import CartEntry from "../models/cartEntry/CartEntry";
import LocalInfo from "./LocalInfo";
import getUnixTime from 'date-fns/getUnixTime';

export default class StockMovementService {
    /*
    * 0. Get all carts
    * 1. Get all sales
    * 2. Get all stocks
    * 3. Get all sales returns
    * 4. Get all stock returns
    * 5. Get all stock movements between branch
    * 6. Merge all arrays.
    * 7. Add type of history
    * */
    static async getStockMovementListByDate(duration , date){
        let movement = [];
        let openingBalance = 0;
        let closingBalance = 0;
        let totalSold = 0;
        let totalPurchased =0;

        if (duration === 'day') {
            //Get sales of date
            const sales = await StockMovementService.formatSales(duration , date);
console.log(sales)
            //Get stocks of date
            const stocks = await StockMovementService.formatStock(duration , date);
            console.log(stocks)

            movement = sales.concat(stocks);

            movement = movement.sort(function (a , b) {
                return a.entryDate - b.entryDate
            });
        } else if(duration === 'week') {

        } else if (duration === 'month') {

        } else if (duration === 'year') {

        }

        console.log(movement);
        return {
            entries: movement.reverse(),
            openingBalance: openingBalance,
            closingBalance: closingBalance,
            totalSold: totalSold,
            totalPurchased: totalPurchased
        }
    }

    static async formatSales(duration , date){
        const sales = await SaleService.getSalesHistory(duration , date);
console.log(sales)
        const movementData = [];

        for(let i = 0; i < sales.length; i++){
            const product = await sales[i].product.fetch();

            movementData.push({
                name: product.name,
                entryDate: sales[i].entryDate,
                purchased: 0,
                sold: sales[i].quantity,
                openingBalance: await StockMovementService.getProductQuantity(sales[i].branchProductId , sales[i].entryDate),
                quantity: sales[i].quantity,
                type: 'sales',
            });
        }

        return movementData;
    }

    static async formatStock(duration , date){
        const movementData = [];
        const stock = await PurchaseService.getPurchaseHistory(duration , date);
console.log(stock)
        for(let i = 0; i < stock.length; i++){
            const product = await stock[i].product.fetch();

            movementData.push({
                name: product.name,
                entryDate: stock[i].stockDate,
                purchased: stock[i].quantity,
                sold: 0,
                openingBalance: await StockMovementService.getProductQuantity(product.id , stock[i].entryDate),
                quantity: stock[i].quantity,
                type: 'sales',
            });
        }

        return movementData;
    }

    static async getProductQuantity(productId , day){
        const date = getUnixTime(day);

        const stock = await database.collections.get(BranchProductStock.table).query(
            Q.where('stockDate' , Q.lte(date)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        console.log(stock);

        const saleEntries = await database.collections.get(SaleEntries.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockMovement = await database.collections.get(StockMovement.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const cartEntries = await database.collections.get(CartEntry.table).query(
            Q.where('entryDate' , Q.lte(date)),
            Q.where('productId' , productId),
            Q.where('branchId' , LocalInfo.branchId),
        ).fetch();

        const stockQuantity = (stock).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const salesQuantity = (saleEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const cartQuantity = (cartEntries).reduce((a, b) => a + (b['quantity'] || 0), 0);
        const stockMovementQuantity = (stockMovement).reduce((a, b) => a + (b['quantity'] || 0), 0);

        return (stockQuantity - (salesQuantity + cartQuantity + stockMovementQuantity));
    }
}
