import React, {useState} from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import shopImg from "../../../../../assets/img/employee.png";
import Button from "@material-ui/core/Button/Button";
import SectionNavbars from '../../../../../components/Sections/SectionNavbars';
import Drawer from "../../../../../components/Drawer/scenarioDrawer/FridgeDrawer";
import MenuIcon from '@material-ui/icons/Menu';
import { Grid } from '@material-ui/core';
import { withRouter } from "react-router-dom";

const Step1 = props => {

    const [isDrawerShow , setIsDrawerShow] = useState(false);

    return(
        <div>

            <SectionNavbars 
                title="Setup Tot"
                leftIcon={ <MenuIcon
                    style={{fontSize: '2rem'}}
                /> }
                leftOnClick={() => setIsDrawerShow(true)}
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            <Box component="div" m={2} style={{marginTop: '5rem'}}>
                <img className="img100" src={shopImg} alt={'test'}/>
            </Box>

            <Typography className='font-weight-light mt-1' style={{ fontSize: '22px', marginBottom: '10px', marginTop: '50px' }} >
                Seems you don't have tots setup
            </Typography>

            <Typography className="font-weight-light mt-1" style={{ fontSize: '17px', margin: '10px' }} >
                Click below to begin
            </Typography>
            
            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ minHeight: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Grid container >
                    <Grid item xs={12} >
                        <Button
                            variant="contained"
                            style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 50px', textTransform: 'none', fontSize:'17px'}}
                            onClick={() => props.step(1)}
                        >
                            Setup tots
                        </Button>
                    </Grid>
                </Grid>
            </Box>

        </div>
    );
};

export default withRouter(Step1);