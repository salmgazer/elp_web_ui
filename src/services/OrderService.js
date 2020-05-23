import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import SaleService from "./SaleService";

export default class OrderService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    static async getOrderHistory(duration , date){
        const purchases = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: LocalInfo.branchId,
                fxn: 'eq'
            }
        );

        const day = new Date(date);

        console.log(day)
        switch (duration) {
            case 'day':
                return purchases.filter(purchase => isSameDay(new Date(purchase.salesDate) , day));
            case 'week':
                //console.log(isSameWeek(sale.salesDate, day))
                return purchases.filter(purchase => isSameWeek(new Date(purchase.salesDate), day));
            case 'month':
                return purchases.filter(purchase => isSameMonth(new Date(purchase.salesDate), day));
            case 'year':
                return purchases.filter(purchase => isSameYear(new Date(purchase.salesDate), day));
        }
    }

    async getOrderDetails(duration , date) {
        const order = await OrderService.getOrderHistory(duration , date);
        console.log(order);
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < order.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(order[step].id));
        }

        for (let step = 0; step < order.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(order[step].id));
        }

        for (let step = 0; step < order.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(order[step].id));
        }

        for (let step = 0; step < order.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(order[step].id));
        }

        for (let step = 0; step < order.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(order[step].id));
        }

        return {
            purchases: order,
            costPrice,
            profit,
            credit,
            sellingPrice,
            quantity
        }
    }
}
