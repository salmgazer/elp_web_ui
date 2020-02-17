import React from 'react';
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import shopImg from "../../../assets/img/shop.svg";
import BoxDefault from "../../Components/Box/BoxDefault";
import Button from "@material-ui/core/Button/Button";

const ViewWelcome = props => {
    return(
        <div>
            <Typography
                variant="h5"
                component="h6"
                className="unFont"
            >
                Hi {props.username}!
            </Typography>
            <Box component="div" m={2}>
                <img className="img100" src={shopImg} alt={'test'}/>
            </Box>c
            <BoxDefault
                styles={{
                    color: '#333333',
                    bottom: '0',
                    'border-top-left-radius': '50px',
                    'border-top-right-radius': '50px',
                    minHeight: '200px',
                    position: 'fixed',
                    padding: '0px',
                    margin: '0px',
                    left: 0,
                    right: 0,
                    width: '100%',
                }}
            >
                <Typography
                    variant="h5"
                    component="h6"
                    className="darkHeader"
                >
                    Welcome to your store.
                </Typography>

                <p style={{fontSize: '18px',fontWeight: '400' , width: '75%', margin: '10px auto'}}>
                    We promise to assist you on your journey of growing your business.
                </p>

                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , borderRadius: '10px', color: '#333333', padding: '8px 50px', margin: '10px auto', fontSize: '16px', fontWeight: '700'}}
                    className={`capitalization`}
                >
                    Get started
                </Button>
            </BoxDefault>
        </div>
    );
};

export default ViewWelcome;