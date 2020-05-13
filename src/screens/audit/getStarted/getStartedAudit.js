import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import './GetStartedAudit.scss';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import auditImg from "../../../assets/img/audit.png";
import BoxDefault from "../../../components/Box/BoxDefault";
import Button from "@material-ui/core/Button/Button";
import paths from "../../../utilities/paths";
import {Link , withRouter} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import SectionNavbars from "../../../components/Sections/SectionNavbars";
import Drawer from "../../../components/Drawer/Drawer";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
}));

const GetStartedAudit = props => {
    const { history } = props;

    const [isDrawerShow , setIsDrawerShow] = useState(false);

    return(
        <div className="getStarted">
            <SectionNavbars
                title={`Audit`}
                leftIcon={
                    <div onClick={() => setIsDrawerShow(true)}>
                        <MenuIcon
                            style={{fontSize: '2rem'}}
                        />
                    </div>
                }
            />

            <div
                onClick={() => setIsDrawerShow(false)}
                onKeyDown={() => setIsDrawerShow(false)}
            >
                <Drawer isShow={isDrawerShow} />
            </div>

            <Box component="div" m={2} className={`mt-6`}>
                <img className="img100" src={auditImg} alt={'test'}/>
            </Box>
            <div className={`sharpBorderRadius`}>
                <BoxDefault
                    styles={{
                        color: '#333333',
                        bottom: '0',
                        minHeight: '280px',
                        position: 'fixed',
                        padding: '0px',
                        margin: '0px',
                        left: 0,
                        right: 0,
                        width: '95%',
                    }}
                >
                    <Typography
                        variant="h5"
                        component="p"
                        style={{fontSize: '18px' ,fontWeight: '500' , color: '#333333', marginTop: '20px'}}
                        className="p-3"
                    >
                        You can check if the products in your shop match the stock on the app!
                    </Typography>

                    <Typography
                        style={{fontSize: '18px',fontWeight: '500' , margin: '15px auto' , color: '#333333'}}
                        variant="h5"
                        component="p"
                    >
                        This helps you record missed purchases, sales or know if some stock is missing
                    </Typography>

                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , width: '90%', borderRadius: '3px', color: '#333333', padding: '8px 50px', margin: '10px auto', fontSize: '18px', fontWeight: '700'}}
                        className={`capitalization`}
                        onClick={() => history.push(paths.audit)}
                    >
                        Start audit
                    </Button><br/>

                    <Link to={paths.forgot_password} style={{textDecorationColor: '#333333'}}>
                        <span  style={{'marginTop': '30px', marginBottom: '20px', color: '#403C3C', fontSize: '20px'}}>View audit history</span> <br/>
                    </Link>
                </BoxDefault>
            </div>
        </div>
    );
};

export default withRouter(GetStartedAudit);
