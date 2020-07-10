import React from "react";
import loading from "../../assets/img/loading.svg";

const PageLoader = () => (
    <div className="spinner">
        <img src={loading} alt="Loading" />
    </div>
);

export default PageLoader;
