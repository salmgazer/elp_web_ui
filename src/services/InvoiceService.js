import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import SaleService from "./SaleService";
import format from "date-fns/format";
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

        const day = format(new Date(date), 'MM/dd/yyyy');

        console.log(day)
        console.log(sales)
        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(format(fromUnixTime(new Date(sale.salesDate)), 'MM/dd/yyyy') , day));
            case 'week':
                //console.log(isSameWeek(sale.salesDate, day))
                return sales.filter(sale => isSameWeek(format(fromUnixTime(new Date(sale.salesDate)), 'MM/dd/yyyy') , day));
            case 'month':
                return sales.filter(sale => isSameMonth(format(fromUnixTime(new Date(sale.salesDate)), 'MM/dd/yyyy') , day));
            case 'year':
                return sales.filter(sale => isSameYear(format(fromUnixTime(new Date(sale.salesDate)), 'MM/dd/yyyy') , day));
        }
    }

    async getInvoiceDetails(duration , date) {
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
