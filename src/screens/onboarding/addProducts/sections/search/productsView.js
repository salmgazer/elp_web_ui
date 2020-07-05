import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid/Grid";
import AddedIcon from "../../../../../components/ClickableIcons/AddedIcon";
import AddIcon from "../../../../../components/ClickableIcons/AddIcon";
import ProductCard from "../../../../../components/Cards/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductsView = (props) => {
    //const [refreshCount , setRefreshCount] = useState(-1);
    const [breakCount , setBreakCount] = useState(props.products.length > 21 ? 21 : props.products.length);
    const [products , setProducts] = useState([]);
    const [currentProducts , setCurrentProducts] = useState([]);
    const [hasMore , setHasMore] = useState(!!(props.products.length >= breakCount));

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (currentProducts.length !== props.products.length) {
            getProduct();
        }
    });

    const getProduct = () => {
        const bCount = props.products.length > 21 ? 21 : props.products.length;
        setBreakCount(bCount);
        setHasMore(!!(props.products.length >= bCount));

        setProducts(props.products.slice(0,bCount));
        setCurrentProducts(props.products);
    };

    const addProductHandler = (id) => {
        props.addProductHandler(id);
    };

    const removeProductHandler = (id) => {
        props.removeProductHandler(id);
    };

    const fetchMoreData = () => {
        if (products.length >= props.products.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setProducts(props.products.slice(0 , (products.length + 21)));
        }, 500);
    };

    return (
        <>
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
                    <Grid container className='mt-3'>
                        {products.map((item , index) =>
                            <Grid
                                key={index}
                                item
                                xs={4}
                                style={{padding: '4px 8px', position: 'relative'}}
                                className={`mx-0 px-1`}
                            >
                                {
                                item.owned ?
                                    <div
                                        onClick={removeProductHandler.bind(this, item.id)}
                                    >
                                        <AddedIcon
                                            styles={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '50%',
                                                top: '-2px',
                                                float: 'right',
                                                position: 'absolute',
                                                right: '-2px',
                                                color: '#28a745',
                                                zIndex: '1500',
                                            }}
                                        />
                                    </div> :
                                    <div
                                        onClick={addProductHandler.bind(this, item.id)}
                                    >
                                        <AddIcon
                                            styles={{
                                                width: '30px',
                                                height: '30px',
                                                borderRadius: '50%',
                                                top: '-2px',
                                                float: 'right',
                                                position: 'absolute',
                                                right: '-2px',
                                                color: '#DAAB59',
                                                zIndex: '1500',
                                            }}
                                        />
                                    </div>
                                }
                                <div key={index} onClick={addProductHandler.bind(this, item.id)}>
                                    <ProductCard isAddProduct={true} product={item} notTruncate={true}/>
                                </div>
                            </Grid>
                        )}
                    </Grid>
                </InfiniteScroll>
            }
        </>
    )
};

export default ProductsView;
