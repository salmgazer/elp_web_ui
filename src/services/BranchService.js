import LocalInfo from "./LocalInfo";
import ModelAction from "./ModelAction";

export default class BranchService {
    constructor (branchId = LocalInfo.branchId) {
        this.branch = (LocalInfo.branches).find(branch => branch.branchId === branchId);
        this.branchId = branchId;
    }

    async sales(){
    }

    getProducts() {
        return new ModelAction('BranchProduct').findByColumnNotObserve({
            name: 'branchId',
            value: this.branchId,
            fxn: 'eq'
        });
    }

    /*
    * Search for a branch product
    * */
    async searchBranchProduct(searchValue) {
        const branchProducts = await this.getProducts();

        const searchResults = branchProducts.filter(async function(item) {
            //console.log(searchValue.toLowerCase());
            //console.log(((await item.product.fetch()).name).toLowerCase());

            return (((await item.product.fetch()).name).toLowerCase().indexOf(searchValue.toLowerCase()) !== -1)
        });

        return searchResults;

        //console.log(await searchResults);
    }
}