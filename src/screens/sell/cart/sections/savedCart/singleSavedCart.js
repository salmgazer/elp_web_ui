import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import PrimaryButton from "../../../../../components/Buttons/PrimaryButton";
import format from 'date-fns/format'

const SingleSavedCart = props => {
    const cartDetails = props.cartDetails;

    const continueSavedCartHandler = (id) => {
        console.log(id);
        props.continueSavedCartHandler(id);
    };

    return (
        <Grid container spacing={1} className={`shadow1 my-2 borderRadius10 px-2 py-1`}>
            <Grid item xs={7}
                  className={`pt-0`}
                  style={{fontSize: '16px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
            >
                <div
                    className={`font-weight-bold`}
                >
                    {cartDetails.customerName}
                </div>
                <div className="mt-1" style={{fontSize: '14px'}}>{`GHC : ${cartDetails.cartTotal}`}</div>
                <div className="font-weight-light mt-1" style={{fontSize: '14px'}}>{format(new Date(cartDetails.createdAt) , "HH:mm a")}</div>
            </Grid>

            <Grid item xs={5}
                  className={`pt-2`}
                  style={{fontSize: '20px', textAlign: 'left', height: '60px', margin: '8px 0px'}}
            >
                <div onClick={continueSavedCartHandler.bind(this , cartDetails.id)}>
                    <PrimaryButton
                        classes={`px-3 my-1 mt-2 font-weight-light`}
                    >
                        Continue
                    </PrimaryButton>
                </div>
            </Grid>
        </Grid>
    );
};

export default SingleSavedCart;