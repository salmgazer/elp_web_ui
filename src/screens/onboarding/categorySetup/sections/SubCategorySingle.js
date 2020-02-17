import React from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Card from "@material-ui/core/Card/Card";

const SubCategorySingle = props => {
    return(
        <Grid item xs={4}>
            <Card
                className="shadow1"
                style={{margin: '5px auto' ,backgroundImage: `url(${props.item.image})` , backgroundPosition: 'center', backgroundSize: 'cover' , width: '100%' , height: '160px', padding: '0px'}}
            >
                <div style={{width: '100%', backgroundColor: '#3333338c', color: '#ffffff', position: 'relative', bottom: '-110px', left:'0', right: '0', padding: '14px 0px'}}>
                    {props.item.name}
                </div>
            </Card>


        </Grid>
    );
};

export default SubCategorySingle;