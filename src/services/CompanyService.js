import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";
import isToday from "date-fns/isToday";
import isWeek from "date-fns/isThisWeek";
import isThisMonth from 'date-fns/isThisMonth'
import isYear from "date-fns/isThisYear";
import SaleService from "./SaleService";

export default class CompanyService {
    /*constructor (company = LocalInfo.companies[0]) {
        this.company = company;
        this.companyId = company.companyId;
    }*/

    static sales() {
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        return new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: branches,
                fxn: 'oneOf'
            }
        );
    }

    static async getSales(duration) {
        const branches = (LocalInfo.branches).map(branch => branch.branchId);

        const sales = await new ModelAction('Sales').findByColumnNotObserve(
            {
                name: 'branchId',
                value: branches,
                fxn: 'oneOf'
            }
        );

        switch (duration) {
            case 'today':
                return sales.filter(sale => isToday(sale.createdAt));
            case 'week':
                return sales.filter(sale => isWeek(sale.createdAt));
            case 'month':
                return sales.filter(sale => isThisMonth(sale.createdAt));
            case 'year':
                return sales.filter(sale => isYear(sale.createdAt));
        }

    }

    /*
    * Get today sales total details
    * @return number - promise
    * */
    async getSalesDetails(duration) {
        const sales = await CompanyService.getSales(duration);

        let total = 0;
        let profit = 0;
        let credit = 0;
        let purchases = 0;

        for (let step = 0; step < sales.length; step++) {
            total += parseFloat(await SaleService.getSaleEntryAmountById(sales[step].id));
        }

        for (let step = 0; step < sales.length; step++) {
            profit += parseFloat(await SaleService.getSaleEntryProfitById(sales[step].id));
        }

        for (let step = 0; step < sales.length; step++) {
            credit += parseFloat(await SaleService.getSaleEntryCreditById(sales[step].id));
        }

        return {
            total,profit,credit,purchases
        };
    }
}