import React  from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import QuantityInput from "../../../Components/Input/QuantityInput";
import PriceInput from "../../../Components/Input/PriceInput";
// import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import SuccessDialog from "../../../Components/Dialog/SuccessDialog";
import Tooltip from '@material-ui/core/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';
import { faInfo } from '@fortawesome/free-solid-svg-icons';
import Modal from "../../../Components/Modal/Modal";
import CostCalculator from "../../../Components/Calculator/CostCalculator";
import CostInput from "../../../Components/Input/CostInput";


const EditProductView = props => {
    const [successDialog, setSuccessDialog] = React.useState(false);
    const [calculatorDialog, setCalculatoDialog] = React.useState(false);

    const product = props.product[0];
    const image = `https://elparah.store/admin/upload/${product.image}`;

    const saveStock = (event) => {
        setSuccessDialog(true);

        setTimeout(function(){
            setSuccessDialog(false);
            props.setView(0, event)
        }, 2000);
    };

    const backHandler = (event) => {
        props.setView(2);
    };

    const openCalculator = (event) => {
        setCalculatoDialog(true);
    };

    const handleModalClose = () => {
        setCalculatoDialog(false);
    };

    return(
        <div style={{paddingTop: '60px'}}>
            <SuccessDialog states={successDialog}/>
            <div>
                <img style={{width: '150px' , height: '150px'}} className={`img-fluid mx-auto d-block pt-2`} src={image} alt={`${product.pro_name}`}/>
            </div>

            <div
                className={`row shadow1 pb-3`}
                style={{'borderTopLeftRadius': '15px', 'borderTopRightRadius': '15px', marginBottom: '60px'}}
            >
                <Typography
                    component="h5"
                    variant="h5"
                    style={{fontWeight: '500', fontSize: '20px' , margin: '0px 0px', padding: '7px'}}
                    className={`text-center mx-auto text-dark`}
                >
                    {product.pro_name}
                </Typography>

                <Modal
                    footer={[<Box
                            className="mx-auto"
                            bgcolor="background.paper"
                            p={1}
                            style={{ minHeight: '2.5rem', width:"100%"}}
                            >
                            <Button
                                variant="outlined"
                                style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 30px', marginRight: '10px'}}
                                onClick={handleModalClose.bind(this)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 25px'}}
                                onClick={saveStock.bind(this)}
                            >
                                Calculate
                            </Button>
                        </Box>]}
                    handleClose={handleModalClose.bind(this)}
                    title={[<div><h5 className={`font-weight-bold text-dark my-0`}>Cost Price Calculator</h5><span style={{fontSize: '16px', fontWeight: '400'}}>{product.pro_name}</span></div>]}
                    states={calculatorDialog}
                >
                    <CostCalculator/>
                </Modal>
                <div className={`bordered rounded mx-3 px-3 py-1`}>
                    <QuantityInput label={`Quantity counted`}/>

                    <CostInput label={`Lowest stock`}>
                        <Tooltip title="You'll receive a notification when the stock is less than this number" arrow>
                            <FontAwesomeIcon icon={faInfo} fixedWidth />
                        </Tooltip>
                    </CostInput>

                    <CostInput label={`Cost price`}>
                        <FontAwesomeIcon onClick={openCalculator.bind(this)} icon={faCalculator} fixedWidth />
                    </CostInput>

                    <PriceInput label={`Selling price`}/>
                </div>
            </div>


            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="outlined"
                    style={{border: '1px solid #DAAB59', color: '#DAAB59', padding: '5px 50px', marginRight: '10px'}}
                    onClick={backHandler.bind(this)}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px'}}
                    onClick={saveStock.bind(this)}
                >
                    Save Info
                </Button>
            </Box>
        </div>
    )
};

export default EditProductView;
