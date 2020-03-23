export default class ProductServiceHandler {
    constructor(product){
        this.product = product;
    }

    /*
    * @var product
    * Get the selling price of product
    * @return var
    * */
    getSellingPrice(){
        return (this.product.owned === true && this.product.sellingPrice) ? (this.product.sellingPrice).toFixed(2) : null;
    }

    /*
    * @var product
    * Get the most recent cost price of product
    * @return var
    * */
    getCostPrice(){
      let mostRecentCostPrice = null;
      this.product.stock.sort(function(stock1,stock2){
        return new Date(stock2.createdAt) - new Date(stock1.createdAt);
      });
      for (let m = this.product.stock.length - 1; m >= 0; m--) {
        if (this.product.stock[m].costPrice) {
          mostRecentCostPrice = this.product.stock[m].costPrice;
          break;
        }
      }
      return mostRecentCostPrice;
      // return this.product.stock ? (this.product.stock[((this.product.stock).length - 1)].costPrice).toFixed(2) : null;
    }

    /*
    * @var product
    * Get the cost price of product
    * @return var
    * */
    getProductStock(){
        return this.product.stock !== null ? this.product.stock : [];
    }


    /*
    * @var product
    * Get the cost price of product
    * @return var
    * */
    getProductHistory(){
        return this.product.history !== null ? this.product.history : [];
    }

    /*
    * @var product
    * Get the image of product
    * @return var
    * */
    getProductImage(){
        return this.product.image ? `https://elparah.store/admin/upload/${this.product.image}` : 'https://elparah.store/admin/upload/no_image.png';
    }

    /*
    * @var product
    * Get the stock quantity
    * @return var
    * */
    getProductQuantity(){
        return (this.getProductStock()).reduce((a, b) => a + (b['quantity'] || 0), 0);
    }

    /*
    * @var product
    * Get the name of product
    * @return var
    * */
    getProductName(){
        return this.product.name ? this.product.name : '';
    }
}
