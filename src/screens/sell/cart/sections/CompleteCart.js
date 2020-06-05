import React, {useEffect , useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Box from "@material-ui/core/Box/Box";
import SuccessImage from '../../../../assets/img/success.png';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button/Button";
import LocalPrintshopIcon from '@material-ui/icons/LocalPrintshop';
import { withRouter } from "react-router-dom";
import SaleService from "../../../../services/SaleService";
import database from "../../../../models/database";
import paths from "../../../../utilities/paths";
import Grid from '@material-ui/core/Grid';
import ReactToPrint from "react-to-print";
import LocalInfo from '../../../../services/LocalInfo';
import CartService from "../../../../services/CartService";

class PrintRec extends React.Component {
    props= {
        products: [],
        receiptNumber: '',
        date: '',
        seller: '',
        customer: '',
        totalQty: '',
        totalAmt: '',
        amtPaid: '',
        changeRem: ''
    }

    render() {
        const style={
            td: {
                border: 'none',
                textAlign: 'right',
                padding: '8px',
                fontSize: '13px',
            }
        }

    return (

        <div style={{width: '35%'}}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Paper >
                        <Typography style={{backgroundColor: 'black', color: 'white', textAlign: 'center', fontSize: '13px'}}>
                            {LocalInfo.branch.name}
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>
                        {LocalInfo.branch.location}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>
                        {LocalInfo.branch.phone}
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={1} style={{ marginBottom: '20px'}} >
                <Grid item xs={2}>
                </Grid>
                <Grid item xs={8}>
                    <table style={{borderCollapse: 'collapse', width: '100%', fontSize: '13px'}} align='center'>
                        <tr>
                            <td className={style.td}>Receipt No. :</td>
                            <td className={style.td}>{this.props.receiptNumber}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Date :</td>
                            <td className={style.td}>{this.props.date}</td>
                        </tr>
                        <tr>
                            <td className={style.td}> Seller :</td>
                            <td className={style.td}>{this.props.seller}</td>
                        </tr>
                        <tr>
                            <td className={style.td}> Customer :</td>
                            <td className={style.td}>{this.props.customer}</td>
                        </tr>
                    </table>
                </Grid>
                <Grid item xs={2}>
                </Grid>
            </Grid>



            <table style={{borderCollapse: 'collapse', width: '100%', marginBottom: '20px', border: 'solid', fontSize: '13px'}} align='center'>
                <thead style={{border: 'solid'}}>
                    <th style={{border: 'solid'}}>Item</th>
                    <th style={{border: 'solid'}}>Qty</th>
                    <th style={{border: 'solid'}}>Price</th>
                    <th style={{border: 'solid'}}>Total</th>
                </thead>
                {this.props.products.map((item) =>

                    <tbody style={{border: 'solid'}}>
                        <tr>
                        <td style={{border: 'solid'}}>{item.name}</td>
                        <td style={{border: 'solid'}}>{item.quantity}</td>
                        <td style={{border: 'solid'}}>{item.sellingPrice}</td>
                        <td style={{border: 'solid'}}>{item.quantity * item.sellingPrice}</td>
                        </tr>
                    </tbody>
                )}
            </table>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <table style={{borderCollapse: 'collapse', width: '100%', fontSize: '13px'}} align='center'>
                        <tr>
                            <td className={style.td}>Item count :</td>
                            <td className={style.td}>{this.props.totalQty}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Total :</td>
                            <td className={style.td}>{this.props.totalAmt}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Amount paid :</td>
                            <td className={style.td}>{this.props.amtPaid}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Change :</td>
                            <td className={style.td}>{this.props.changeRem}</td>
                        </tr>
                    </table>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>
                        Thank you for your patronage
                    </Typography>
                </Grid>
            </Grid>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Typography style={{textAlign: 'center', fontSize: '13px'}}>
                        Developed by El Parah
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
    }
}

const useStyles = makeStyles(theme => ({
    root: {
    flexGrow: 1,

    },
    title: {
            fontSize: 11,
        },
    paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    width: '80%',
    marginLeft: '25px',
    },
    button: {
        border: '1px solid #DAAB59',
        color: '#DAAB59',
        padding: '7px 40px',

        marginTop: '5px',
        marginBottom: '20px',
        textTransform: 'none',
    },
    table:{
        borderCollapse: 'collapse',
        width: '80%',
    },
    td: {
        border: 'none',
        textAlign: 'right',
        padding: '8px',
    }
}));

const CheckoutView = props => {
    const componentRef = useRef();
    const { history } = props;
    const [salesId , setSalesId] = useState(0);
    const [salesTotal , setSalesTotal] = useState(0);
    const [amountPaid , setAmountPaid] = useState(0);
    const [quantity , setQuantity] = useState(0);
    const [receipt , setReceipt] = useState(0);
    const [date , setDate] = useState(0);
    const [seller , setSeller] = useState('');
    const [customerName, setCustomerName] = React.useState('');

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (salesId === 0) {
            getSalesId();
        }
    });

    const getSalesId = async () => {
        const sale = await database.adapter.getLocal("saleId");
        const total = await SaleService.getSaleEntryAmountPaidById(sale);
        const qty = await SaleService.getSaleProductQuantity(sale);
        const lastsale = await SaleService.getLastSale();
        console.log(lastsale);
        const recDate = lastsale.salesDate;
        const rec = lastsale.receiptNumber;
        setCustomerName(await new CartService().getCartCustomer(props.currentCustomer));
        setSeller(LocalInfo.username);
        setReceipt(rec.slice(0,8));
        //const total = await SaleService.getSaleEntryAmountById(sale);
        setQuantity(qty);
        setDate(recDate);
        setSalesId(total);
        setAmountPaid((parseFloat(localStorage.getItem('amountPaid'))).toFixed(2));
        setSalesTotal((parseFloat(total)).toFixed(2));
    };

    const classes = useStyles();

    const backHandler = (event) => {
        props.setView(1);
    };

    return(
        <div className={classes.root} >

            <ArrowBackIcon  style={{position: 'relative', float: 'left', fontSize: '2rem', marginLeft: '10px'}}
                onClick={backHandler.bind(this)}

            />

            <Box component="div" m={2} style={{margin: '16px 0px 0px 0px'}}>
                <img className="img100" src={SuccessImage} alt={'test'}/>
            </Box>

            <Typography className='text-dark font-weight-bold' style={{ fontSize: '22px', marginBottom: '10px' }} >
                Sale recorded successfully
            </Typography>

            <Paper variant="outlined" className={classes.paper}>

                <Typography className='text-dark font-weight-bold' style={{ fontSize: '20px', marginTop: '10px' }} >
                    Summary
                </Typography>

                <table className={classes.table} align='center'>
                    <tr>
                        <td className={classes.td}>Total :</td>
                        <td className={classes.td}>{`GHC ${salesTotal}`}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}>Paid :</td>
                        <td className={classes.td}>{`GHC ${amountPaid}`}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}> Change :</td>
                        <td className={classes.td}>{`GHC ${amountPaid - salesTotal}`}</td>
                    </tr>
                </table>

                {/* <Button
                    variant="outlined"
                    style={{fontSize: '16px', }}
                    className={classes.button}
                    onclick={print}
                >
                    <LocalPrintshopIcon />
                    &nbsp; Print reciept
                </Button> */}
                <ReactToPrint
                    trigger={() =>
                    <Button
                        variant="outlined"
                        style={{fontSize: '16px', }}
                        className={classes.button}
                        // onClick={print}
                    >
                        <LocalPrintshopIcon />
                        &nbsp; Print receipt
                    </Button> }

                    content={() => componentRef.current}
                />
                <div style={{ display: "none" }}>
                    <PrintRec
                        ref={componentRef}
                        products={props.products}
                        date= {date}
                        receiptNumber={receipt}
                        seller= {seller}
                        customer= {customerName}
                        totalQty= {quantity}
                        totalAmt= {`GHC ${salesTotal}`}
                        amtPaid= {`GHC ${amountPaid}`}
                        changeRem= {`GHC ${amountPaid - salesTotal}`}
                     /></div>

            </Paper>

            <div
                onClick={() => history.push(paths.sell)}
            >
                <Button
                    variant="contained"
                    className='text-dark font-weight-bold'
                    style={{
                        backgroundColor: '#DAAB59',
                        color: '#333333',
                        padding: '5px 40px',
                        textTransform: 'none',
                        fontSize: '20px',
                        marginTop: '10px'
                    }}
                >
                    Continue selling
                </Button>
            </div>


        </div>
    )

}

export default withRouter(CheckoutView);
