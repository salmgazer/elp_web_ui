import React, {Suspense} from 'react';
import CategorySingle from "./CategorySingle";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import SubCategorySingle from "./SubCategorySingle";
import ComponentLoader from "../../../../components/Loader/componentLoader";

const CategoriesView = React.lazy(() => import("./CategoriesView"));

const Step1 = (props) => {
    const subcategories = props.subcategories;
    const categories = props.categories;

    const _viewSubCategory = (event) => {
        props.clickFnc('all' , event);
    };

    return(
        <div className={`mb-5`}>
            {
                categories.length > 0 ?
                    <Suspense fallback={<ComponentLoader text={`Loading categories...`}/>}>
                        <CategoriesView categories={categories} subcategories={subcategories} activeItem={props.activeItem} clickFnc={props.clickFnc} _viewSubCategory={_viewSubCategory.bind(this)} _addSubCategoryHandler={props.addSubCategory} _removeSubCategoryHandler={props.removeSubCategory}/>
                    </Suspense>
                : ''
            }
        </div>
    );
};

export default Step1;
