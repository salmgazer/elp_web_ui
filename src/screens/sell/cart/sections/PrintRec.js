import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SingleReceipt from './BoxView/SingleReceipt';
import LocalInfo from '../../../../services/LocalInfo';
import Paper from '@material-ui/core/Paper';
import SaleService from "../../../../services/SaleService";
import format from "date-fns/format";
import fromUnixTime from "date-fns/fromUnixTime";
import CartService from "../../../../services/CartService";

class PrintRec extends React.Component {
    state= {
        receiptNumber: '',
        date: '',
        seller: '',
        customer: '',
        totalQty: '',
        totalAmt: '',
        amtPaid: '',
        changeRem: '',
        saleEntries: [],
    }

    async componentDidMount() {
        const lastsale = await SaleService.getLastSale();
        const total = await SaleService.getSaleEntryAmountPaidById(lastsale.id);
        const qty = await SaleService.getSaleProductQuantity(lastsale.id);
        const recDate = format(fromUnixTime(lastsale.salesDate) , "eeee, MMMM do, yyyy");
        const rec = lastsale.receiptNumber;

        const props = this.props;

        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log(props)
        const entries = await lastsale.sale_entries.fetch();
        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log(entries);

        await this.setState({
            saleEntries: entries
        });
    }

    render() {
        const style={
            td: {
                border: 'none',
                textAlign: 'right',
                padding: '8px',
                fontSize: '13px',
            }
        };

        return (
            <div style={{width: '350px'}}>
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
                        <SingleReceipt key={item.id} saleEntry={item} />
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
                            Developed by My Store Aid
                        </Typography>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default PrintRec;
