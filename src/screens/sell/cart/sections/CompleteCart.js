import React, {useEffect , useState} from 'react';
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
    const { history } = props;
    const [salesId , setSalesId] = useState(0);
    const [salesTotal , setSalesTotal] = useState(0);
    const [amountPaid , setAmountPaid] = useState(0);

    useEffect(() => {
        // You need to restrict it at some point
        // This is just dummy code and should be replaced by actual
        if (salesId === 0) {
            getSalesId();
        }
    });

    const getSalesId = async () => {
        const sale = await database.adapter.getLocal("saleId");
        const paid = await SaleService.getSaleEntryAmountPaidById(sale);
        const total = await SaleService.getSaleEntryAmountById(sale);
        setSalesId(sale);
        setAmountPaid((parseFloat(paid)).toFixed(2));
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
                        <td className={classes.td}> Change :</td>
                        <td className={classes.td}>{`GHC ${amountPaid - salesTotal}`}</td>
                    </tr>
                    <tr>
                        <td className={classes.td}>Paid :</td>
                        <td className={classes.td}>{`GHC ${amountPaid}`}</td>
                    </tr>
                </table>

                <Button
                    variant="outlined"
                    style={{fontSize: '16px', }}
                    className={classes.button}
                    
                >
                    <LocalPrintshopIcon />
                    &nbsp; Print reciept
                </Button>

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