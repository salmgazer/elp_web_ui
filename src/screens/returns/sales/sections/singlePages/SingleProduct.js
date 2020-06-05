import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import UndoIcon from '@material-ui/icons/Undo';
import Button from "@material-ui/core/Button/Button";
import MainDialog from '../../../../../components/Dialog/MainDialog';
import QuantityInput from "../../../../Components/Input/QuantityInput";

const SingleProduct = props => {

    const product = props.product;
    const [mainDialog, setMainDialog] = React.useState(false);

    const image = `https://elparah.store/admin/upload/${product.image}`;

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };
    

    return(
        <div>
            <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                <Grid item xs={3}>
                    <Card
                        className="shadow1"
                        style={{
                            margin: '5px auto', 
                            backgroundImage: `url(${image})`, 
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            width: '60px', 
                            borderRadius: '50%', 
                            height: '60px', 
                            padding: '0px'
                        }}
                    />
                </Grid>
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold' >{product.name}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>Quantity: {product.quantity}</div>
                        <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>Cost: GHC {product.cost}</div>
                    </div>
                </Grid>

                <Grid item xs={3} style={{height: '60px', margin: '10px 0px 0px 0px'}}  >
                    <div className="font-weight-light mt-1" style={{ fontSize: '14px'}}>{product.date}</div>
                    <Button
                        variant="outlined"
                        style={{color: '#DAAB59', textTransform: 'none', fontSize: '10px', padding: '0px 0px'}}
                        onClick={openDialogHandler.bind(this)}
                    >
                        <UndoIcon style={{fontSize: '20px'}} />
                            <br/>
                        Return
                    </Button>
                </Grid>
            </Grid>

            <MainDialog handleDialogClose={closeDialogHandler.bind(this)} states={mainDialog} >
                <div className="row pt-0 mx-auto text-center w-100" >
                    <Grid container spacing={1} className={`shadow1 mb-3 borderRadius10`}>
                        <Grid item xs={3}>
                            <Card
                                className="shadow1"
                                style={{
                                    margin: '5px auto',
                                    backgroundImage: `url(${image})`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    width: '60px',
                                    borderRadius: '50%',
                                    height: '60px',
                                    padding: '0px'
                                }}
                            />
                        </Grid>
                        <Grid item xs={9} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                            <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                                <span className='text-dark font-weight-bold' >{product.name}</span>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Quantity: {product.quantity}</div>
                                <div className="font-weight-light mt-1" style={{ fontSize: '13px'}}>Cost: GHC {product.cost}</div>
                            </div>
                        </Grid>
                    </Grid>

                    <QuantityInput style={{width: '100%', margin: '50px', paddingBottom: '30px'}} label={`Quantity`} inputName="quantity" />

                    <Grid container spacing={1} style={{marginTop: '50px'}}>
                        <Grid item xs={6}>
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 40px', textTransform: 'none', fontSize:'15px'}}
                                onClick={closeDialogHandler.bind(this)}
                            >
                                Cancel
                            </Button>
                        </Grid>

                        <Grid item xs={6}>
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'15px'}}
                                onClick={closeDialogHandler.bind(this)}
                            >
                                Return
                            </Button>
                        </Grid>
                    </Grid>

                </div>
            </MainDialog>
                    

        </div>

    );
};

export default SingleProduct;
