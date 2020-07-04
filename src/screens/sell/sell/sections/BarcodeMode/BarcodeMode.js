import React , {useState} from 'react';
import { BrowserBarcodeReader } from '@zxing/library';
import './barcodeMode.scss';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import MainDialog from "../../../../../components/Dialog/MainDialog";
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";
import ProductCard from "../../../../../components/Cards/ProductCard";
import SingleProductMainCard from "../singleProductMainCard";

const BarcodeMode = props => {
    const [barcodeNumber , setBarcodeNumber] = useState();
    const [barcodeProducts , setBarcodeProducts] = useState([]);
    const [barcodeProduct , setBarcodeProduct] = useState(false);
    const [showProduct , setShowProduct] = useState(false);

    const codeReader = new BrowserBarcodeReader();
    const beepSound = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU'+Array(1e3).join(123));
    let selectedDeviceId;

    codeReader
        .listVideoInputDevices()
        .then(videoInputDevices => {
            videoInputDevices.forEach(device =>
                console.log(`${device.label}, ${device.deviceId}`)
            );

            selectedDeviceId = videoInputDevices[0].deviceId;

            let userAgent = navigator.userAgent.toLowerCase();
            let android = userAgent.indexOf("android") > -1;

            if (videoInputDevices.length >= 1) {
                if(android) {
                    selectedDeviceId = videoInputDevices[1].deviceId
                }
            }

            document.getElementById('barOverlay').addEventListener('click', () => {
                document.getElementById('barOverlay').style.display = 'none';

                codeReader
                    .decodeOnceFromVideoDevice(selectedDeviceId, 'video')
                    .then(result => {
                        beepSound.play();
                        setBarcodeNumber(result.text);
                        barcodeSearchHandler(result.text);
                        document.getElementById('barOverlay').style.display = 'block';
                    })
                    .catch(err => {
                        codeReader.reset();
                        document.getElementById('barOverlay').style.display = 'block';

                        console.log(err)
                    });
            });
        })
        .catch(err => console.error(err));

    const barcodeSearchHandler = async(barcode) => {
        if(barcode === '' || typeof barcode === 'undefined'){
            alert('Barcode empty. Please try again.');
            codeReader.reset();

            return false;
        }
        const products = await props.searchBarcode(barcodeNumber);

        if(products.length === 1){
            setBarcodeProducts([]);
            setBarcodeProduct(await products[0].product.fetch());
            setShowProduct(true);
        }else if(products.length === 0) {
            setBarcodeProducts([]);
            setBarcodeProduct(false);
            alert('Product with this barcode does not exist');
        }else if(products.length > 1){
            setShowProduct(true);
            setBarcodeProduct(false);
            setBarcodeProducts(products);
        }

        codeReader.reset();
        setBarcodeNumber('');
    };

    const addProductToCart = (productId) => {
        props.productAdd(productId, 1);
    };

    const removeProductHandler = (name) => {
        alert(`${name} is out of stock or has no cost price. Please add stock`);
    };

    return(
        <div>
            <MainDialog
                states={showProduct}
                handleDialogClose={() => setShowProduct(false)}
            >
                <Typography
                    component="h6"
                    variant="h6"
                    className={`text-center my-1`}
                    style={{fontWeight: '500', fontSize: '20px' , margin: '5px auto', paddingTop: '10px'}}
                >
                    { barcodeProduct ? `Selected product :` : `Selected products :`}
                </Typography>

                {
                    barcodeProduct ?
                        <>
                            <div className={`w-100 m-2`}>
                                <img className={`img-fluid mx-auto w-50 h-75`} src={new ProductServiceHandler(barcodeProduct).getProductImage()} alt={`${barcodeProduct.name}`}/>
                            </div>

                            <Typography
                                component="p"
                                variant="h6"
                                className={`text-center my-2 font-weight-bold`}
                                style={{fontWeight: '500', fontSize: '16px' , margin: '5px auto', paddingTop: '10px'}}
                            >
                                {barcodeProduct.name}
                            </Typography>

                            <Box
                                className={`bg-white my-3`}
                                p={1}
                            >
                                <Button
                                    variant="outlined"
                                    style={{border: '1px solid #DAAB59', color: '#DAAB59', marginRight: '10px'}}
                                    onClick = {() => setShowProduct(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{'backgroundColor': '#DAAB59', padding: '5px 30px', color: '#333333'}}
                                    onClick = {addProductToCart.bind(this , barcodeProduct.id)}
                                >
                                    Add
                                </Button>
                            </Box>
                        </>
                        :''
                }

                { barcodeProducts.length > 1 ? (
                        <Grid container spacing={1} className='mt-1'>
                            {barcodeProducts.map(item =>
                                <Grid key={item.productId} item xs={6}
                                      style={{padding: '4px 8px', position: 'relative'}} className={`mx-0 px-1`}>
                                    <SingleProductMainCard
                                        branchProduct={item}
                                        negFunc={removeProductHandler}
                                    />
                                    <ProductCard notTruncate={true} branchProduct={item} removeProductHandler={removeProductHandler.bind(this)} addProductHandler={addProductToCart.bind(this)} isSell={true} product={item.product.fetch()} />
                                </Grid>
                            )}
                        </Grid>
                    )
                    :
                    ''
                }
            </MainDialog>

            <div
                id="barOverlay"
                className="text-center text-white"
                style={{
                    backgroundSize: '80% 250px',
                    position: 'absolute',
                    height: '40vh',
                    zIndex: '1000',
                    width: '95%',
                    backgroundColor: '#919191',
                    opacity: '0.4',
                    outlineOffset: '0px',
                    outline: '15px solid rgb(145, 145, 145)',
                    marginTop: '18px'
                }}
            >
                <p className="text-center w-100 font-weight-bold"
                   style={{marginTop: '30%',fontSize: '20px',color: 'black'}}
                >
                    Click to scan barcode of product
                </p>
            </div>

            <Grid container spacing={1} className={`p-3 mb-0 mx-1`}>
                <Grid
                    item xs={12}
                    className={`text-right`}
                >
                    <div className={`video_canvas`}>
                        <video
                            id="video"
                            width="235"
                            height="200"
                            muted={true}
                            style={{backgroundColor: '#ffffff'}}
                        >
                        </video>
                    </div>
                </Grid>
            </Grid>

            <Box
                className={`newBox shadow1 bg-white pb-1 pt-1`}
                p={1}
                style={{position:'relative', zIndex: 1030,  right: 0, left: 0, bottom: '1.0rem', width: '90%', minHeight: '180px', margin: '5px auto'}}
            >
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '500', fontSize: '16px', lineHeight: '1.5', marginTop: '40px', marginBottom: '20px'}}
                >
                    Scan the barcode of the product to sell
                </Typography>

                <FormControl variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        placeholder="Barcode number appears here"
                        size="small"
                        type="number"
                        value={barcodeNumber}
                        onChange={event => setBarcodeNumber(event.target.value)}
                        style={{width: '280px'}}
                        startAdornment={<InputAdornment position="start"><GraphicEqIcon /> </InputAdornment>}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 70px', textTransform: 'none', marginTop: '40px', fontSize: '17px'}}
                    onClick={barcodeSearchHandler.bind(this , barcodeNumber)}
                >
                    Finish
                </Button>
            </Box>
            {/*<div id="barOverlay" className="text-center text-white"
                 style={{ backgroundRepeat: 'no-repeat' , backgroundPosition: 'top', backgroundSize: '80% 250px', position: 'absolute', height: '65vh',zIndex: '1000',width: '100%',backgroundColor: '#919191',opacity: '0.4', outlineOffset: '0px', outline: '15px solid rgb(145, 145, 145)'}}>
                <p className="text-center w-100 font-weight-bold"
                   style={{marginTop: '30%',fontSize: '20px',color: 'black'}}>Click to scan
                    barcode of product</p>
            </div>*/}
            {/*<div id="barOverlay" className="text-center text-white"
                 style={{backgroundSize: '80% 250px', position: 'absolute', height: '40vh',zIndex: '1000',width: '100%',backgroundColor: '#919191',opacity: '0.4', outlineOffset: '0px', outline: '15px solid rgb(145, 145, 145)', marginTop: '18px'}}>
                <p className="text-center w-100 font-weight-bold"
                   style={{marginTop: '30%',fontSize: '20px',color: 'black'}}>Click to scan
                    barcode of product</p>
            </div>*/}

            {/*<Grid container spacing={1} className={`p-3 mb-0 mx-1`}>
                <Grid
                    item xs={12}
                    className={`text-right`}
                >
                    <div className={`video_canvas`}>
                        <video
                            id="video"
                            width="235"
                            height="200"
                            muted={true}
                            style={{backgroundColor: '#ffffff'}}
                        >
                        </video>
                    </div>
                </Grid>
            </Grid>*/}
            {/* <div
                className={`newBox`}
                style={{position:'relative', zIndex: 1030, right: 0, left: '-3.5%', width: '100%'}}
            >
                <Box
                    className={`shadow1 bg-white`}
                    p={1}
                    style={{ position: "fixed", bottom:"0rem", width:"100%", height: '100px' }}
                >
                    <div className={`w-75 mx-auto`}>
                        <Typography
                            component="p"
                            variant="h6"
                            className={`text-center my-1 font-weight-bold`}
                            style={{fontWeight: '400', fontSize: '16px' , margin: '5px auto', paddingTop: '10px'}}
                        >
                            Sell products
                        </Typography>
                        <Grid container spacing={1} className={`mb-2`}>
                            <Grid
                                item xs={10}
                                className={`text-right`}
                            >
                                <Paper className={`${styles.root} text-center`} >
                                    <InputBase
                                        className={`${styles.input} search-box`}
                                        placeholder="Enter barcode key"
                                        value={barcodeNumber}
                                        inputProps={{ 'aria-label': 'Enter barcode key' }}
                                        onChange={(event) => setBarcodeNumber(event.target.value)}
                                    />
                                </Paper>
                            </Grid>

                            <Grid
                                item xs={2}
                                className={`text-left`}
                                style={{color: '#D34343'}}
                            >
                                <div style={{backgroundColor: '#DAAB59', color: '#333333', borderRadius: '50%', width: '40px', height: '40px'}}>
                                    <SearchIcon className={`p-2`} onClick={barcodeSearchHandler}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Box>
            </div> */}

            {/*<Box
                className={`newBox shadow1 bg-white py-2 pt-1`}
                p={1}
                style={{position:'relative', zIndex: 1030,  right: 0, left: 0, bottom: '1.0rem', width: '100%', minHeight: '100px'}}
            >

                <Typography
                    component="h5"
                    variant="h5"
                    className={`mt-2`}
                    style={{fontWeight: '500', fontSize: '18px', lineHeight: '1.5', marginTop: '40px', marginBottom: '20px'}}
                >
                    Scan the barcode of the product
                </Typography>

                <FormControl variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        placeholder="Barcode number appears here"
                        size="small"
                        type="number"
                        value={barcodeNumber}
                        onChange={event => setBarcodeNumber(event.target.value)}
                        style={{width: '90%' , maxWidth: '320px'}}
                        startAdornment={<InputAdornment position="start"><GraphicEqIcon /> </InputAdornment>}
                    />
                </FormControl>

                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 70px', textTransform: 'none', marginTop: '40px', fontSize: '17px'}}
                    onClick={barcodeSearchHandler.bind(this)}
                >
                    Finish
                </Button>

            </Box>*/}


        </div>
    );
};

export default BarcodeMode;
