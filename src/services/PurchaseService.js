import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import SaleService from "./SaleService";
import BranchStockService from './BranchStockService';

export default class PurchaseService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    static async getPurchaseHistory(duration , date){
        const purchases = await new ModelAction('BranchProductStock').findByColumnNotObserve(
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
                return purchases.filter(purchase => isSameDay(new Date(purchase.createdAt) , day));
            case 'week':
                //console.log(isSameWeek(sale.salesDate, day))
                return purchases.filter(purchase => isSameWeek(new Date(purchase.createdAt), day));
            case 'month':
                return purchases.filter(purchase => isSameMonth(new Date(purchase.createdAt), day));
            case 'year':
                return purchases.filter(purchase => isSameYear(new Date(purchase.createdAt), day));
        }
    }

    async getPurchaseDetails(duration , date) {
        const purchase = await PurchaseService.getPurchaseHistory(duration , date);
        console.log(purchase);
        let costPrice = 0;
        let quantity = 0;

        for (let step = 0; step < purchase.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(purchase[step].id));
        }

        for (let step = 0; step < purchase.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(purchase[step].id));
        }

        return {
            purchases: purchase,
            costPrice,
            quantity
        }
    }
}
