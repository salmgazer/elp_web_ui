import React, {Component} from 'react';
import SellView from "./sections/SellView";
import AddProductCart from "./sections/AddProductCart";
import Api from "../../../services/Api";
import LocalInfo from "../../../services/LocalInfo";
import SavedCart from "../cart/sections/savedCart/savedCart";
import BranchService from "../../../services/BranchService";
import {withDatabase} from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { withRouter } from "react-router-dom";
import ModelAction from "../../../services/ModelAction";
import CartService from "../../../services/CartService";
import Carts from "../../../models/carts/Carts";
import CartEntry from "../../../models/cartEntry/CartEntry";
import BranchProduct from "../../../models/branchesProducts/BranchProduct";
import {Q} from "@nozbe/watermelondb";

class Sell extends Component {
    state = {
        isDrawerShow: false,
        salesMade: 175,
        profitMade: 50,
        activeStep: 0,
        spCount: 3,
        productList: [],
        savedCart: [
            {
                id: '123456',
                customerName: 'Pearl Anim',
                cartTotal: '50.00',
                createdAt: '2020-03-16T08:55:11.851Z'
            }
        ],
        branchProducts: [],
    };

    async componentDidMount() {
        const { history, database , branchProducts , cartQuantity } = this.props;

        await this.setState({
            branchProducts: branchProducts
        });
        //this.state.branchProducts = await ;
        console.log(await new CartService().cartId());
        console.log(branchProducts);
        //console.log(await cartQ);
    }

    //Steps to select category
    getSteps = () => {
        return ['Main View' , 'Product Details View'];
    };

    getStepContent = step => {
        switch (step) {
            case 0:
                return <SellView branchProducts={this.state.branchProducts} searchHandler={this.searchHandler.bind(this)} productAdd={this.showAddView.bind(this)} spCount={this.state.spCount} salesMade={this.state.salesMade} profitMade={this.state.profitMade} searchBarcode={this.searchBarcode.bind(this)} setView={this.setStepContentView.bind(this)} />;
            case 1:
                return <AddProductCart addToCart={this.addProductToCartHandler.bind(this)} setView={this.setStepContentView.bind(this)} product={this.state.currentProduct} spCount={this.state.spCount} salesMade={this.state.salesMade} profitMade={this.state.profitMade}/>;
            case 2:
                return <SavedCart continueSavedCartHandler={this.continueSavedCartHandler.bind(this)} searchSavedCart={this.searchSavedCartHandler.bind(this)} setView={this.setStepContentView.bind(this)} carts={this.state.savedCart} />;
            default:
                return 'Complete';
        }
    };

    setStepContentView = step => {
        this.setState({
            activeStep: step
        });
    };

    /*
    *Add product to cart
    * */
    addProductToCartHandler = (formFields) => {
        return new CartService().addProductToCart(formFields);
    };

    /*
    * Search products handler...
    * */
    searchSavedCartHandler = (search) => {
        /*
        * @todo
        * Work on fetching data from source
        * */
        let savedCart = JSON.parse(localStorage.getItem('savedCart')) || [];

        const searchResults = savedCart.filter(function(cart) {
            return ((cart.customerName).toLowerCase().indexOf(search.toLowerCase()) !== -1 || cart.cartTotal === search)
        });

        this.setState({
            savedCart: searchResults
        });
    };

    /*
    * Search products handler...
    * */
    searchHandler = (search) => {
        /*
        * @todo
        * Work on fetching data from source
        * */
        let storeProducts = JSON.parse(localStorage.getItem('storeProductsLookup'));

        const searchResults = storeProducts.filter(function(item) {
            return ((item.name).toLowerCase().indexOf(search.toLowerCase()) !== -1 && item.owned === true)
        });

        this.setState({
            productList: searchResults
        });
    };

    /*Add product to cart*/
    showAddView = async (productId , step) => {
        const old_list = this.state.branchProducts;

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((item => item.productId === productId));

        //console.log(itemIndex)
        this.setState({
            currentProduct: itemIndex,
            activeStep: step
        });
    };

    continueSavedCartHandler = async (cartId) => {
        console.log(cartId);
    };

    //Search product barcode
    searchBarcode = async (barcode) => {
        //console.log(`${proId} from addProduct`);

        const old_list = JSON.parse(localStorage.getItem('storeProductsLookup'));

        //Find index of specific object using findIndex method.
        const itemIndex = old_list.filter((product => product.barCode === barcode));

        console.log(itemIndex);
        await this.setState({
            currentProduct: itemIndex,
        });

        return itemIndex;
    };

    render(){
        return (
            <div>
                {this.getStepContent(this.state.activeStep)}
            </div>
        );
    }
}

const EnhancedSell = withDatabase(
    withObservables([], ({ database }) => ({
        branchProducts: new BranchService(LocalInfo.branchId).getProducts(),
        cartQuantity: CartService.cartQuantity(),
        //cartQ: database.collections.get(CartEntry.table).query(Q.where('id', new CartService().cartId())).observe(),
        //cartQ: database.collections.get(CartEntry.table).find(new CartService().cartId()),
    }))(withRouter(Sell))
);

export default EnhancedSell;