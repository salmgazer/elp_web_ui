import React from 'react';

const CategorySingle = props => {
    const _viewSubCategory = (id , event) => {
        props._viewSubCategory(id , event);
    };

    return(
        <span
            key={props.item.uuid}
            className="shadow1"
            style={{cursor: 'pointer'}}
            onClick={_viewSubCategory.bind(this, props.item.uuid)}
        >
            {props.item.name}
        </span>
    );
};

export default CategorySingle;