import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import SaleService from "./SaleService";
import fromUnixTime from "date-fns/fromUnixTime";

export default class InvoiceService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    static async getInvoiceHistory(duration , date){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: LocalInfo.branchId,
                fxn: 'eq'
            }
        );

        const day = new Date(date);

        console.log(day)
        console.log(sales)
        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(fromUnixTime(sale.salesDate) , day));
            case 'week':
                //console.log(isSameWeek(sale.salesDate, day))
                return sales.filter(sale => isSameWeek(fromUnixTime(sale.salesDate) , day));
            case 'month':
                return sales.filter(sale => isSameMonth(fromUnixTime(sale.salesDate) , day));
            case 'year':
                return sales.filter(sale => isSameYear(fromUnixTime(sale.salesDate) , day));
        }
    }

    async getInvoiceDetails(duration , date) {
        console.log(date)
        const invoice = await InvoiceService.getInvoiceHistory(duration , date);
        console.log(invoice);
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < invoice.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(invoice[step].id));
        }

        return {
            invoices: invoice,
            costPrice,
            profit,
            credit,
            sellingPrice,
            quantity
        }
    }

    static async getInvoiceHistorybyCustomer (custId){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: LocalInfo.branchId,
                fxn: 'eq'
            }
        );

        return sales.filter(sale => sale.customerId === custId);
    }

    async getInvoiceDetailsbyCustomer (custId) {
        const invoice = (await InvoiceService.getInvoiceHistorybyCustomer(custId)).reverse();
        console.log(invoice);
        let costPrice = 0;
        let profit = 0;
        let credit = 0;
        let sellingPrice = 0;
        let quantity = 0;

        for (let step = 0; step < invoice.length; step++) {
            costPrice += parseFloat(await SaleService.getSaleEntryCostPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            sellingPrice += parseFloat(await SaleService.getSaleEntrySellingPriceById(invoice[step].id));
        }

        for (let step = 0; step < invoice.length; step++) {
            quantity += parseFloat(await SaleService.getSaleProductQuantity(invoice[step].id));
        }

        return {
            invoices: invoice,
            costPrice,
            profit,
            credit,
            sellingPrice,
            quantity
        }
    }
}
