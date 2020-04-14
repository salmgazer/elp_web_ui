import ModelAction from "./ModelAction";
import BranchService from "./BranchService";

export default class BranchProductService {
    constructor(branchProduct){
        this.branchProduct = branchProduct;
    }

    async product(){
        return this.branchProduct.product.fetch();
    }

    getSellingPrice(){
        return this.branchProduct.sellingPrice ? this.branchProduct.sellingPrice : null;
    }

    async getProductStock(){
        return this.branchProduct.stocks();
    }

    async getProductQuantity(){
        return ((await this.getProductStock())).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    async getProductImage(){
        const product = await this.product();
        return product.image ? `https://elparah.store/admin/upload/${this.product.image}` : 'https://elparah.store/admin/upload/no_image.png';
    }

    async getCostPrice(){
        let mostRecentCostPrice = null;
        const productStock = await this.getProductStock();

        productStock.sort(function(stock1,stock2){
            return new Date(stock2.created_at) - new Date(stock1.created_at);
        });

        for (let m = productStock.length - 1; m >= 0; m--) {
            if (productStock[m].costPrice) {
                mostRecentCostPrice = productStock[m].costPrice;
                break;
            }
        }
        return mostRecentCostPrice;
        // return this.product.stock ? (this.product.stock[((this.product.stock).length - 1)].costPrice).toFixed(2) : null;
    }

    /*
    * Return a stores products
    * @return boolean
    * */
    isProductSellable(){
        return !!(this.getProductQuantity() && this.getCostPrice() && this.getSellingPrice());
    }
}