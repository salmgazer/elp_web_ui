import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";

export default class BranchService {
    constructor (branchId) {
        this.branch = (LocalInfo.branches).find(branch => branch.branchId === branchId);
        this.branchId = branchId;
    }

    async sales(){
    }

    getProducts() {
        return new ModelAction('BranchProduct').findByColumn({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });
    }
}