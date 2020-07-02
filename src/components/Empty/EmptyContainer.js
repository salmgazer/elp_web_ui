import React from 'react';
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import Empty from '../../assets/img/employee.png';

const EmptyContainer = (props) => {
    const buttonAction = () => {
        props.buttonAction();
    };

    return (
        <div>
            <Box component="div" m={2} style={{marginTop: '-1rem'}} >
                <img className="img100" src={props.imageLink || Empty} alt={props.title || 'No data available'}/>
            </Box>

            <Typography className='text-dark font-weight-bold' style={{ fontSize: '17px', padding: '0px 10px 10px 10px' }} >
                {props.headerText || 'No data available'}
            </Typography>

            {
                props.description ?
                    <Typography className='font-weight-light mt-1' style={{ fontSize: '15px', marginBottom: '20px' }} >
                        {props.description}
                    </Typography>
                : ''
            }

            {
                props.button ?
                    <Button
                        variant="contained"
                        style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                        onClick={buttonAction.bind(this)}
                    >
                        {props.btnText}
                    </Button>
                : ''
            }
        </div>
    )
};

export default EmptyContainer;
