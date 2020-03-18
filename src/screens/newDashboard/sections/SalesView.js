import React from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography/Typography";
import BoxDefault from "../../Components/Box/BoxDefault";
import CardGridComponent from "./CardComponent.js";

const SalesView = props => {

    return (
        <div >      
            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
            >
                <Typography
                    component="p"
                    variant="h6"
                    style={{fontWeight: '700', fontSize: '1.20rem'}}
                >
                    Sales summary
                </Typography>

                <Grid container spacing={1}>
                    <CardGridComponent
                        title="Total amount"
                        amount={props.totalAmount}
                    >
                        <br /><div className="font-weight-light mt-1" style={{marginTop: '5px', fontSize: '10px', color: 'purple'}}>2% lower than last week</div>
                    </CardGridComponent>
                    <CardGridComponent
                        title="Profit made"
                        amount={props.profitMade}
                    >
                        <br /><div className="font-weight-light mt-1" style={{marginTop: '5px', fontSize: '10px', color: 'purple'}}>2% lower than last week</div>
                    </CardGridComponent>
                    <CardGridComponent
                        title="Credit sales"
                        amount={props.creditSales}
                    >
                        <br/><a  href="#" style={{'marginTop': '1px', color: '#DAAB59', fontSize: '14px', fontWeight: '300'}}>View credit sales</a>
                    </CardGridComponent>
                    <CardGridComponent
                        title="Total stock"
                        amount={props.totalStock}
                    >
                        <br/><a  href="#" style={{'marginTop': '1px', color: '#DAAB59', fontSize: '14px', fontWeight: '300'}}>View stock</a>
                    </CardGridComponent>
                </Grid>
            </BoxDefault>
                        
        </div>
    );
};

export default withRouter(SalesView);
