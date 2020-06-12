import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isSameDay from "date-fns/isSameDay";
import isSameWeek from "date-fns/isSameWeek";
import isSameMonth from "date-fns/isSameMonth";
import isSameYear from "date-fns/isSameYear";
import SaleService from "./SaleService";
import database from "../models/database";
import * as Q from "@nozbe/watermelondb/QueryDescription";
import fromUnixTime from "date-fns/fromUnixTime";
import startOfMonth from "date-fns/startOfMonth";
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import format from "date-fns/format";
import startOfWeek from "date-fns/startOfWeek";
import endOfWeek from "date-fns/endOfWeek";
import getWeekOfMonth from "date-fns/getWeekOfMonth";
import isWithinInterval from "date-fns/isWithinInterval";
import startOfYear from "date-fns/startOfYear";
import lastDayOfYear from "date-fns/lastDayOfYear";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval";

export default class InvoiceService {
    constructor(){
        this.branchId = LocalInfo.branchId;
    }

    static async getSaleFormatAsync(invoice){
        let total = 0;

        for (let step = 0; step < invoice.length; step++) {
            total += parseFloat(await SaleService.getSaleEntrySellingPriceById(invoice[step].id));
        }

        return {
            total,
            invoices: invoice
        }
    }

    /*
    * Search for an invoice
    * */
    async searchInvoice(searchValue) {
        const invoice = await new ModelAction('Sales').findByColumnNotObserve({
            name: 'receiptNumber',
            value: searchValue,
            fxn: 'like'
        });

        return  database.collections.get('sales').query(Q.where('id',
        Q.oneOf(invoice.map(i => i.id))), Q.where('branchId', LocalInfo.branchId)).fetch();
    }

    static async weekSalesFormat(invoices){
        console.log(invoices)
        let weekFormatInvoices = [];
        const newInvoices = invoices.reduce((r, a) => {
            const day = new Date(fromUnixTime(a.salesDate));
            r[day] = [...r[day] || [], a];
            return r;
        }, []);

        console.log(newInvoices)

        for (const [key, value] of Object.entries(newInvoices)) {
            weekFormatInvoices.push({...await InvoiceService.getSaleFormatAsync(value) , day: key})
        }

        console.log(weekFormatInvoices)
        return weekFormatInvoices;
    }

    static async monthSalesFormat (invoices , date){
        const newDate = new Date(date);
        let weekFormatSales = [];
        let monthWeekInvoices = [];

        const monthStart = startOfMonth(newDate , { weekStartsOn: 1 });
        const monthEnd = lastDayOfMonth(newDate , { weekStartsOn: 1 });

        const weeksInMonth = eachWeekOfInterval({
            start: monthStart,
            end: monthEnd
        }, { weekStartsOn: 1 });

        /*
        * @todo there is an issue with weeks that start in other previous month...
        * */
        for (let i = 0; i < weeksInMonth.length; i++) {
            const startDate = format(startOfWeek(weeksInMonth[i] , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            let lastDate = '';
            if(weeksInMonth.length !== i + 1){
                lastDate = format(endOfWeek(weeksInMonth[i] , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            }else{
                lastDate = `${format(monthEnd, 'MM/dd/yyyy')}`;
            }
            let week = getWeekOfMonth(weeksInMonth[i]);

            week = `Week ${week} : ${startDate} - ${lastDate}`;

            monthWeekInvoices[week] = [];
        }

        for (let index = 0; index < invoices.length; index++){
            const day = new Date(fromUnixTime(invoices[index].salesDate));

            const startDate = format(startOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            let lastDate = format(endOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');

            const sameMonth = isSameMonth(new Date(startDate), new Date(lastDate));

            if(sameMonth){
                lastDate = format(endOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            }else{
                lastDate = `${format(monthEnd, 'MM/dd/yyyy')}`;
            }

            let week = getWeekOfMonth(day);

            week = `Week ${week} : ${startDate} - ${lastDate}`;

            const isValid = isWithinInterval((day), {
                start: new Date(startDate),
                end: new Date(lastDate)
            });

            if(isValid) {
                monthWeekInvoices[week] = [...monthWeekInvoices[week] || [], invoices[index]];
            }
        }

        /*const newPurchases = purchases.reduce((r, a) => {
            const day = new Date(fromUnixTime(a.stockDate));

            const startDate = format(startOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');
            const lastDate = format(endOfWeek(day , { weekStartsOn: 1 }), 'MM/dd/yyyy');

            let week = getWeekOfMonth(day);
            week = `Week ${week} : ${startDate} - ${lastDate}`;
            r[week] = [...r[week] || [], a];
            return r;
        }, []);

        console.log(newPurchases)*/
        for (const [key, value] of Object.entries(monthWeekInvoices)) {
            weekFormatSales.push({...await InvoiceService.getSaleFormatAsync(value) , week: key})
        }

        return weekFormatSales;
    }

    static async yearSalesFormat (purchases , date){
        console.log(date)
        const newDate = new Date(date);
        let yearFormatSales = [];
        let yearMonthPurchases = [];

        const yearStart = startOfYear(newDate);

        const isYear = isSameYear(newDate, new Date());
        let yearEnd = '';

        if(isYear){
            yearEnd = new Date();
        }else{
            yearEnd = lastDayOfYear(newDate);
        }
        console.log(yearStart , yearEnd)
        const monthsInYear = eachMonthOfInterval({
            start: yearStart,
            end: yearEnd
        });


        for (let i = 0; i < monthsInYear.length; i++) {
            const month = format(monthsInYear[i] , 'MMMM yyyy');

            yearMonthPurchases[month] = [];
        }

        for (let index = 0; index < purchases.length; index++){
            const day = new Date(fromUnixTime(purchases[index].salesDate));

            let month = format(day , 'MMMM yyyy');
            const isValid = isSameYear(day , newDate);

            if(isValid) {
                yearMonthPurchases[month] = [...yearMonthPurchases[month] || [], purchases[index]];
            }
        }


        for (const [key, value] of Object.entries(yearMonthPurchases)) {
            yearFormatSales.push({...await InvoiceService.getSaleFormatAsync(value) , month: key})
        }

        return yearFormatSales;
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

        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(fromUnixTime(sale.salesDate) , day));
            case 'week':
                return sales.filter(sale => isSameWeek(fromUnixTime(sale.salesDate) , day));
            case 'month':
                return sales.filter(sale => isSameMonth(fromUnixTime(sale.salesDate) , day));
            case 'year':
                return sales.filter(sale => isSameYear(fromUnixTime(sale.salesDate) , day));
        }
    }

    async getInvoiceDetails(duration , date) {
        console.log(date)
        let invoice = (await InvoiceService.getInvoiceHistory(duration , date));
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

        if (duration === 'week') {
            invoice = await InvoiceService.weekSalesFormat(invoice);
        } else if (duration === 'month') {
            invoice = await InvoiceService.monthSalesFormat(invoice , date);
        } else if (duration === 'year') {
            invoice = await InvoiceService.yearSalesFormat(invoice , date);
        }

        return {
            invoices: invoice.reverse(),
            costPrice,
            profit,
            credit,
            sellingPrice,
            quantity
        }
    }

    static async getInvoiceHistorybyCustomer (duration , date , customerId){
        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'customerId',
                value: customerId,
                fxn: 'eq'
            }
        );

        const day = new Date(date);

        switch (duration) {
            case 'day':
                return sales.filter(sale => isSameDay(fromUnixTime(sale.salesDate) , day));
            case 'week':
                return sales.filter(sale => isSameWeek(fromUnixTime(sale.salesDate) , day));
            case 'month':
                return sales.filter(sale => isSameMonth(fromUnixTime(sale.salesDate) , day));
            case 'year':
                return sales.filter(sale => isSameYear(fromUnixTime(sale.salesDate) , day));
        }
    }

    async getInvoiceDetailsbyCustomer (duration , date , customerId) {
        let invoice = (await InvoiceService.getInvoiceHistorybyCustomer(duration , date , customerId));
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

        if (duration === 'week') {
            invoice = await InvoiceService.weekSalesFormat(invoice);
        } else if (duration === 'month') {
            invoice = await InvoiceService.monthSalesFormat(invoice , date);
        } else if (duration === 'year') {
            invoice = await InvoiceService.yearSalesFormat(invoice , date);
        }

        return {
            invoices: invoice.reverse(),
            costPrice,
            profit,
            credit,
            sellingPrice,
            quantity
        }
    }
}
