import React , { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card/Card";
import EditIcon from '@material-ui/icons/Edit';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


const SingleViewCustomer = props => {

    const employee = props.activity;
    // const [customer , setCustomer] = useState('');
    // const [name , setName] = useState('');
    // const [number , setNumber] = useState('');
    // const [mainDialog, setMainDialog] = React.useState(false);

    // useEffect(() => {
    //     // You need to restrict it at some point
    //     // This is just dummy code and should be replaced by actual
    //     if (!customer) {
    //         getCustomer();
    //     }
    // }, []);

    // const getCustomer = async () => {
    //     const newCustomer = await props.customer;
    //     setCustomer(newCustomer);
    //     setName(newCustomer.firstName + ' ' + newCustomer.otherNames);
    //     setNumber(newCustomer.phone);
    // };

    // const openDialogHandler = (event) => {
    //     setMainDialog(true);
    // };

    return(

        <div>
                
            <Grid container spacing={1} >

                <Grid item xs={3}>
                    <Card
                        className="shadow1"
                        style={{
                            margin: '10px auto',  
                            backgroundPosition: 'center', 
                            backgroundSize: 'cover', 
                            width: '50px', 
                            borderRadius: '50%', 
                            height: '50px', 
                            padding: '0px'
                        }}
                    >
                    </Card>
                </Grid>

                <Grid item xs={6} style={{display: 'table', height: '60px', margin: '8px 0px'}} >
                    <div style={{textAlign: 'left', display: 'table-cell', verticalAlign: 'middle'}}>
                        <span className="font-weight-light mt-1" style={{ fontSize: '15px'}} >{employee.activity}</span>
                        <div className="font-weight-light mt-1" style={{ fontSize: '15px'}}> {employee.date}</div>
                    </div>
                </Grid>

                <Grid item xs={2} style={{ paddingTop: "15px", fontSize: '12px' }}  >
                        <EditIcon style={{fontSize: '30px', color: '#DAAB59'}} />
                            <br/>
                        Edit
                    </Grid>

                
            </Grid>
                  
        </div>
        
    )

}
export default withRouter(SingleViewCustomer);