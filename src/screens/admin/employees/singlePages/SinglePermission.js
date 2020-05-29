import React, {useEffect , useState} from 'react';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '../../../../components/Switch/Switch';
import CheckBox from '../../../../components/CheckBox/CheckBox';


const SinglePermission = props => {

    const permission = props.permission;
    // const [total , setTotal] = useState(false);
    // const [payment , setPayment] = useState(false);



    return ( 
        <div>
            <Grid container  className={`shadow1 mb-3 borderRadius10`} >
                <Grid container style={{paddingTop: "7px", borderBottom: "1px solid #d8d2d2"}}>

                    <Grid item xs={10} style={{paddingTop: "9px", textAlign: 'left'}}>
                        Admin
                    </Grid>

                    <Grid item xs={2}  style={{paddingTop: "9px"}}>
                        <Switch style={{fontSize: '10px'}} />
                    </Grid>

                </Grid>

                <Grid container >
                    <FormGroup row>
                        <CheckBox label='read sales' />
                        <CheckBox label='create product' />
                    </FormGroup>
                    <FormGroup row>
                        <CheckBox label='delete sales' />
                        <CheckBox label='create sales' />
                    </FormGroup>
                    <FormGroup row>
                        <CheckBox label='update sales' />
                        <CheckBox label='read sales' />
                    </FormGroup>
                </Grid>
            </Grid>
           
        </div>
    )
}

export default SinglePermission;