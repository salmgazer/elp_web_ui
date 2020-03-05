import React from 'react';
import { BrowserQRCodeReader } from '@zxing/library';
import {makeStyles} from "@material-ui/core";
import './barcodeMode.scss';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import './AddProducts.scss';
import Don from '../../../../assets/img/Don.jpg';



const useStyles = makeStyles(theme => ({
    root: {
        width: '95%',
        display: 'flex',
        padding: '2px 5px',
        alignItems: 'center',
        borderRadius: '30px',
        height: '35px',
        border: '1px solid #ced4da',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        transition: 'border-color .15s ease-in-out,box-shadow .15s ease-in-out',
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}));

const BarcodeMode = props => {
    const styles = useStyles();
    const codeReader = new BrowserQRCodeReader();
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
                        document.getElementById('productBarcode').value = result.text;
                        document.getElementById('barOverlay').style.display = 'block';
                    })
                    .catch(err => {
                        //document.getElementById('barError').textContent = err;
                        console.log(err)
                    });
            });


            /*codeReader
                .decodeFromVideoDevice(selectedDeviceId, 'video', (result, err) => {
                    if (result) {
                        beepSound.play();
                        alert(result);
                        document.getElementById('productBarcode').val(result.text);
                        //scanCode(result.text);
                        codeReader.reset();
                        //$('#barOverlay').show();

                    }
                    if (err && !(err instanceof BrowserQRCodeReader.NotFoundException)) {
                        console.error(err);
                        document.getElementById('barError').textContent = err;
                    }
            })*/
        })
        .catch(err => console.error(err));

    return(
        <div className={`bCode mx-1`} style={{position: 'relative', minHeight: '65vh'}}>
{/*
            <div style={{width: '100%' ,position: 'relative'}}>
*/}
                <div id="barOverlay" className="text-center text-white"
                     style={{backgroundImage: `url(${Don})`, backgroundRepeat: 'no-repeat' , backgroundPosition: 'top', backgroundSize: '80% 250px', position: 'absolute', height: '65vh',zIndex: '1000',width: '100%',backgroundColor: '#919191',opacity: '0.4', outlineOffset: '0px', outline: '15px solid rgb(145, 145, 145)'}}>
                    <p className="text-center w-100 font-weight-bold"
                       style={{marginTop: '30%',fontSize: '20px',color: 'black'}}>Click to scan
                        barcode of product</p>
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
{/*
            </div>
*/}

            <div
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
                            Add products
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
                                        inputProps={{ 'aria-label': 'Enter barcode key' }}
                                    />
                                </Paper>
                            </Grid>

                            <Grid
                                item xs={2}
                                className={`text-left`}
                                style={{color: '#D34343'}}
                            >
                                <div style={{backgroundColor: '#DAAB59', color: '#333333', borderRadius: '50%', width: '40px', height: '40px'}}>
                                    <SearchIcon className={`p-2`}/>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                </Box>
            </div>
        </div>
    );
};

export default BarcodeMode;