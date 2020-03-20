import React from 'react';
import Card from "@material-ui/core/Card/Card";
import Grid from "@material-ui/core/Grid/Grid";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '../../../Components/Modal/Modal';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";
import Typography from '@material-ui/core/Typography';

const ViewSingleProduct = props => {
    const product = props.item;
    const [mainDialog, setMainDialog] = React.useState(false);

    const image = `https://elparah.store/admin/upload/${product.image}`;

    const closeDialogHandler = (event) => {
        setMainDialog(false);
    };

    const openDialogHandler = (event) => {
        setMainDialog(true);
    };

    const deleteProductHandler = (pId , event) => {
        props.deleteStoreProduct(pId , event);
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
                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}}>
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className='text-dark font-weight-bold'  style={{ fontSize: '15px'}}>{product.name}</span>

                        { product.difference  > "0" ? 
                                <div className="font-weight-light mt-1" style={{ fontSize: '11px', color: 'green'}}>App: {product.app} | Count: {product.count} | Diff: {product.difference}</div>
                            : product.difference  < "0" ? 
                                <div className="font-weight-light mt-1" style={{ fontSize: '11px', color: 'red'}}>App: {product.app} | Count: {product.count} | Diff: {product.difference}</div>
                            : 
                            <div className="font-weight-light mt-1" style={{ fontSize: '11px'}}>App: {product.app} | Count: {product.count} | Diff: {product.difference}</div>
                        }

                    </div>
                </Grid>
                <Grid item xs={1.5} style={{height: '60px', margin: '20px 0px 0px 0px'}}>
                    <EditIcon
                            onClick={openDialogHandler.bind(this)}
                            style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                        /> 
                </Grid>
                <Grid item xs={1.5} style={{height: '60px', margin: '20px 0px 0px 0px'}}>                       
                    <DeleteIcon
                        onClick={deleteProductHandler.bind(this , product.prod_id)}
                        style={{fontSize: '30px', color: '#DAAB59', textAlign: 'right'}}
                    /> 
                </Grid>
            </Grid>

            <Modal 
                handleClose={closeDialogHandler.bind(this)} 
                states={mainDialog}
                title={

                    <Grid container spacing={1} >
                        <span className='text-dark font-weight-bold' >{product.name}</span>
                    </Grid>
                }
                footer={ 

                    <Box
                        className="shadow1"
                        bgcolor="background.paper"
                        p={1}
                        style={{ height: '2.5rem', width:"100%" }}
                    >
                        <Button
                            variant="outlined"
                            style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 35px', marginRight: '10px', textTransform: 'none', fontSize:'17px'}}
                            onClick={closeDialogHandler.bind(this)}
                        >
                            Cancel  
                        </Button>
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 30px', textTransform: 'none', fontSize:'17px'}}
                        >
                            Balance
                        </Button>
                    </Box>                    
                }
            >
                    <Typography
                        component="p"
                        variant="h6"
                        style={{fontSize: '18px'}}
                    >
                        App: {product.app} | Count: {product.count} | Difference: {product.difference}
                    </Typography>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                    >
                        Change quantity counted  
                    </Button>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                    >
                        Sell 
                    </Button>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                    >
                        Add to stock 
                    </Button>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                    >
                        Check sales history 
                    </Button>

                    <Button
                        variant="outlined"
                        style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '10px, 0px', textTransform: 'none', fontSize:'17px', marginBottom: '20px', width: '240px'}}
                    >
                        Check purchase history 
                    </Button>

            </Modal>

        </div>
    );
};

export default ViewSingleProduct;