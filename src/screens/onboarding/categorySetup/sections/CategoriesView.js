import React, {useEffect, useState} from "react";
import CategorySingle from "./CategorySingle";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import SubCategorySingle from "./SubCategorySingle";
import InfiniteScroll from "react-infinite-scroll-component";

const CategoriesView = (props) => {
    const [breakCount , setBreakCount] = useState(props.subcategories.length > 30 ? 30 : props.subcategories.length);
    const [products , setProducts] = useState([]);
    const [currentProducts , setCurrentProducts] = useState([]);
    const [currentCounter , setCurrentCounter] = useState(0);
    const [hasMore , setHasMore] = useState(!!(props.subcategories.length >= breakCount));

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (currentProducts.length !== props.subcategories.length || currentCounter !== props.counter) {
            getProduct();
        }
    });

    const getProduct = () => {
        const bCount = props.subcategories.length > 30 ? 30 : props.subcategories.length;
        setBreakCount(bCount);
        setHasMore(!!(props.subcategories.length >= bCount));
        setCurrentCounter(props.counter);
        setProducts(props.subcategories.slice(0,bCount));
        setCurrentProducts(props.subcategories);
    };

    const fetchMoreData = () => {
        if (products.length >= props.subcategories.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setProducts(props.subcategories.slice(0 , (products.length + 30)));
        }, 500);
    };

    const _viewSubCategory = (event) => {
        props._viewSubCategory('all' , event);
    };

    return (
        <div>
            <p style={{marginTop: '60px', fontSize: '18px', fontWeight: '400', color: '#333333'}}>Select product categories you sell</p>

            <div className="scrollWrapper">
                <span
                    key={0}
                    className={`shadow1 ${props.activeItem === 0 ? `activeBorder activeColor` : ''}`}
                    style={{cursor: 'pointer' , width: '40px'}}
                    onClick={_viewSubCategory.bind(this)}
                >
                    All
                </span>
                {props.categories.map((item) => <CategorySingle activeItem={props.activeItem} _viewSubCategory={props.clickFnc} key={item.id} item={item}/>)}
            </div>

            <Box style={{marginTop: '5px'}} p={1}>
                {
                    <InfiniteScroll
                        dataLength={products.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign: 'center'}}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                        hasChildren={true}
                    >
                        <Grid container spacing={1}>
                            {
                                products.map((item , index) =>
                                    <SubCategorySingle
                                        key={item.id}
                                        item={item}
                                        _addSubCategoryHandler={props._addSubCategoryHandler}
                                        _removeSubCategoryHandler={props._removeSubCategoryHandler}
                                    />
                                )
                            }
                        </Grid>
                    </InfiniteScroll>
                }
            </Box>
        </div>
    )
};

export default CategoriesView;
