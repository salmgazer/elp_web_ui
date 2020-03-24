import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import BoxDefault from '../../../../Components/Box/BoxDefault';

const SingleReconciliationDetail = props => {
    const report = props.reportItem;
    
    return (
        <div>
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
            >
                <Typography component="p" style={{ fontSize: '15px' }} >
                    {report.date}
                </Typography>

                <Grid container spacing={1} >
                    <Grid item xs={3}>
                        <Typography component="p" style={{ marginTop: '10px', fontSize: '13px' }} >
                            Sales
                        </Typography>
                        <Typography component="p" style={{ fontSize: '13px' }} >
                            GHC {report.sales}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography component="p" style={{ marginTop: '10px', fontSize: '13px' }} >
                            Credit
                        </Typography>
                        <Typography component="p" style={{ fontSize: '13px' }} >
                            GHC {report.credit}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography component="p" style={{ marginTop: '10px', fontSize: '13px' }} >
                            Expenses
                        </Typography>
                        <Typography component="p" style={{ fontSize: '13px' }} >
                            GHC {report.expenses}
                        </Typography>
                    </Grid>

                    <Grid item xs={3}>
                        <Typography component="p" style={{ marginTop: '10px', fontSize: '13px' }} >
                            Cash in
                        </Typography>
                        <Typography component="p" style={{ fontSize: '13px' }} >
                            GHC {report.cashIn}
                        </Typography>
                    </Grid>

                </Grid>

            </BoxDefault>
        </div>
    )
}

export default SingleReconciliationDetail;