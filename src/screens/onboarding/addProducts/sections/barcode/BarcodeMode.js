import React , {useState} from 'react';
import { BrowserBarcodeReader } from '@zxing/library';
import '../barcode/barcodeMode.scss';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import '../AddProducts.scss';
import MainDialog from "../../../../../components/Dialog/MainDialog";
// import SimpleSnackbar from "../../../../../components/Snackbar/SimpleSnackbar";
import ProductServiceHandler from "../../../../../services/ProductServiceHandler";
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
// import SingleProductBox from "../../../../../components/Product/SingleProductBox";
import AddedIcon from "../../../../../components/ClickableIcons/AddedIcon";
import AddIcon from "../../../../../components/ClickableIcons/AddIcon";
import ProductCard from "../../../../../components/Cards/ProductCard";

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

                        //document.getElementById('barError').textContent = err;
                        console.log(err)
                    });
                    codeReader.reset();
            });
        })
        .catch(err => console.error(err));

    const barcodeSearchHandler = async(barcode) => {
        if(barcode === '' || typeof barcode === 'undefined'){
            alert('Barcode empty. Please try again.');
            codeReader.reset();

            return false;
        }
        const products = await props.searchBarcode(barcode);

        if(products.length === 1){
            setBarcodeProducts([]);
            setBarcodeProduct(products[0]);
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

    const addProductHandler = (id) => {
        props.productAdd(id);
    };

    const removeProductHandler = (id) => {
        props.removeProduct(id);
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
                                    onClick={addProductHandler.bind(this , barcodeProduct.id)}
                                >
                                    Add
                                </Button>
                            </Box>
                        </>
                        :''
                }

                { barcodeProducts.length > 1 ? (
                        <Grid container spacing={1} className='mt-1'>
                            {barcodeProducts.map((item , index) =>
                                <Grid key={index} item xs={4} style={{padding: '4px 8px', position: 'relative'}}
                                      className={`mx-0 px-1`}>
                                    {item.owned ?
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
            </Box>
        </div>
    );
};

export default BarcodeMode;
