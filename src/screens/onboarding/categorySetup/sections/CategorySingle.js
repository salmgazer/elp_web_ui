import React from 'react';

const CategorySingle = props => {
    const _viewSubCategory = (id , event) => {
        props._viewSubCategory(id , event);
    };

    return(
        <span
            key={props.item.id}
            className="shadow1"
            style={{cursor: 'pointer'}}
            onClick={_viewSubCategory.bind(this, props.item.id)}
        >
            {props.item.name}
        </span>
    );
};

export default CategorySingle;
