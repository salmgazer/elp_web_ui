import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SingleReceipt from './BoxView/SingleReceipt';
import LocalInfo from '../../../../services/LocalInfo';
import Paper from '@material-ui/core/Paper';


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
        const products = this.props;

        console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
        console.log(products.salesEntries);
        const entries = products.salesEntries.fetch();
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
                            <td className={style.td}>{this.state.receiptNumber}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Date :</td>
                            <td className={style.td}>{this.state.date}</td>
                        </tr>
                        <tr>
                            <td className={style.td}> Seller :</td>
                            <td className={style.td}>{this.state.seller}</td>
                        </tr>
                        <tr>
                            <td className={style.td}> Customer :</td>
                            <td className={style.td}>{this.state.customer}</td>
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
                {this.state.saleEntries.map((item) =>

                    <SingleReceipt key={item.id} saleEntry={item} />
                )}
            </table>

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <table style={{borderCollapse: 'collapse', width: '100%', fontSize: '13px'}} align='center'>
                        <tr>
                            <td className={style.td}>Item count :</td>
                            <td className={style.td}>{this.state.totalQty}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Total :</td>
                            <td className={style.td}>{this.state.totalAmt}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Amount paid :</td>
                            <td className={style.td}>{this.state.amtPaid}</td>
                        </tr>
                        <tr>
                            <td className={style.td}>Change :</td>
                            <td className={style.td}>{this.state.changeRem}</td>
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
                        Developed by mystore aid
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
    }
}

export default PrintRec;