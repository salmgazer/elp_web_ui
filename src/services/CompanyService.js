import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";

export default class CompanyService {
    constructor (company) {
        this.company = company;
        this.companyId = company.companyId;
    }

    static sales() {
        const branches = (LocalInfo.branches).map(branch => branch.branchId);
        console.log(branches)
        const sales = new ModelAction('Sales').findByColumn(
            {
                name: 'branchId',
                value: branches,
                fxn: 'oneOf'
            }
        );

        console.log(sales);
        return sales;
    }
}