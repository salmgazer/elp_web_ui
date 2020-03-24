import React from 'react';
import SectionNavbar from '../../../Components/Sections/SectionNavbars';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dates from '../../../Components/Date/Date';
import BoxDefault from '../../../Components/Box/BoxDefault';
import Box from "@material-ui/core/Box/Box";
import Button from "@material-ui/core/Button/Button";

import SingleReconciliationHistory from './singleViews/SingleReconciliationHistory';



const ReconciliationDetails = props => {

    const backHandler = (event) => {
        props.setView(0);
     };

    return (
        <div>
            <SectionNavbar 
                title="Reconciliation History"
                icons={
                    <MoreVertIcon 
                        style={{fontSize: '2rem'}}
                    />}
            >
                <ArrowBackIosIcon
                    style={{fontSize: '2rem'}}
                />
            </SectionNavbar>

            <BoxDefault
                bgcolor="background.paper"
                p={1}
                className={'boxDefault'}
            >
                <Dates label='Date picker' style={{marginTop: '50px', width: '180px', border: '1px solid #DAAB59'}} />
            </BoxDefault>

            {props.histList.map((item) => <SingleReconciliationHistory  key={item.id} historyItem={item} setView={props.setView} />)}

            <Box
                className="shadow1"
                bgcolor="background.paper"
                p={1}
                style={{ height: '2.5rem', position: "fixed", bottom:"0", width:"100%" }}
            >
                <Button
                    variant="contained"
                    style={{'backgroundColor': '#DAAB59' , color: '#333333', padding: '5px 40px', textTransform: 'none', fontSize:'17px'}}
                    onClick={backHandler.bind(this)}
                >
                    Back
                </Button>
            </Box>

        </div>
    )

}

export default ReconciliationDetails;