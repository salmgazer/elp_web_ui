import React from "react";
import "./App.scss";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import database from "./models/database";
import Login from "./screens/login/Login";
import Home from "./screens/home/Home";
import Register from "./screens/register/Register";
import VerifySMS from "./screens/verifySMS/Verify_sms";
import Dashboard from "./screens/dashboard/Dasboard";

import {
  HashRouter as Router,
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import paths from "./utilities/paths";
import GetStarted from "./screens/getStarted/GetStarted";
import AddProducts from "./screens/onboarding/addProducts/AddProducts";
import CategorySetup from "./screens/onboarding/categorySetup/CategorySetup";
import Cart from "./screens/sell/cart/Cart";

import Accounting from "./screens/accounting/Accounting";
import SalesHistory from "./screens/history/salesHistory/SalesHistory";
import PurchaseHistory from "./screens/history/purchaseHistory/PurchaseHistory";
import OrderHistory from "./screens/history/orderHistory/OrderHistory";
import InvoiceHistory from "./screens/history/invoiceHistory/InvoiceHistory";

import ResetPassword from "./screens/forgotPassword/sections/ResetPassword";
import ForgottenPassword from "./screens/forgotPassword/ForgottenPassword";
import StoreSummary from "./screens/sell/store_summary/StoreSummary";
import Sell from "./screens/sell/sell/Sell";
import MainViewStock from "./screens/stock/DirectiveViewStock";
import GetStartedAudit from "./screens/audit/getStarted/getStartedAudit";
import Audit from "./screens/audit/Audit";
import Admin from "./screens/admin/Admin";
import AddWarehouse from "./screens/admin/warehouse/AddWarehouse";
import ChangeStoreInformation from "./screens/admin/storeInformation/ChangeStoreInformation";
import AccountInformation from "./screens/admin/accountInformation/AccountInformation";
import VerifyPhone from "./screens/admin/accountInformation/VerifyPhone";
import ChangePrice from "./screens/admin/changePrice/ChangePrice";
import Suppliers from "./screens/admin/suppliers/Suppliers";
import ViewSuppliers from "./screens/admin/suppliers/ViewSuppliers";
import SupplierDetails from "./screens/admin/suppliers/SupplierDetails";
import PaySupplier from "./screens/admin/suppliers/PaySupplier";
import SupplierStock from "./screens/admin/suppliers/SupplierStock";
import AddSupplier from "./screens/admin/suppliers/AddSupplier";

function NoMatch() {
  let location = useLocation();

  return (
    <div
      status="404"
      title="404"
      subTitle={`Sorry, the page ${location.pathname} does not exist.`}
      extra={
        <button type="primary" onClick={() => (window.location.href = "/")}>
          Back Home
        </button>
      }
    />
  );
}

function setPageBackground(backgroundColor = "#fff") {
  document.body.style.backgroundColor = backgroundColor;
}

class App extends React.Component {
  setTitle(title) {
    document.title = title;
  }

  render() {
    const appName = "El-Parah Retail App";

    return (
      <DatabaseProvider database={database}>
        <div className="App">
          <Router>
            <Switch>
              <Route
                exact
                path={paths.login}
                render={() => {
                  this.setTitle(`Login | ${appName}`);
                  return <Login />;
                }}
              />
              <Route
                exact
                path={paths.cart}
                render={() => {
                  this.setTitle(`Cart | ${appName}`);
                  return <Cart />;
                }}
              />
              <Route
                exact
                path={paths.sales_history}
                render={() => {
                  this.setTitle(`Sales History | ${appName}`);
                  return <SalesHistory />;
                }}
              />
              <Route
                exact
                path={paths.purchase_history}
                render={() => {
                  this.setTitle(`Purchase History | ${appName}`);
                  return <PurchaseHistory />;
                }}
              />
              <Route
                exact
                path={paths.order_history}
                render={() => {
                  this.setTitle(`Order History | ${appName}`);
                  return <OrderHistory />;
                }}
              />
              <Route
                exact
                path={paths.invoice_history}
                render={() => {
                  this.setTitle(`Invoice History | ${appName}`);
                  return <InvoiceHistory />;
                }}
              />
              <Route
                exact
                path={paths.accounting}
                render={() => {
                  this.setTitle(`Accounting | ${appName}`);
                  return <Accounting />;
                }}
              />
              <Route
                path={paths.register}
                render={() => {
                  this.setTitle(`Registration | ${appName}`);
                  setPageBackground();
                  return <Register />;
                }}
              />
                <Route
                path={paths.reset_password}
                render={() => {
                  this.setTitle(`Reset Password | ${appName}`);
                  setPageBackground();
                  return <ResetPassword />;
                }}
              />
                <Route
                    path={paths.forgot_password}
                    render={() => {
                        this.setTitle(`Forgot Password | ${appName}`);
                        setPageBackground();
                        return <ForgottenPassword />;
                    }}
                />
              <Route
                path={paths.home}
                render={() => {
                  setPageBackground();
                  this.setTitle(`Home | ${appName}`);
                  return <Home />;
                }}
              />
                <Route
                    path={paths.verify_sms}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Verify contact | ${appName}`);
                        return <VerifySMS />;
                    }}
                />
                <Route
                    path={paths.dashboard}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Dashboard | ${appName}`);
                        return <Dashboard />;
                    }}
                />
                <Route
                    path={paths.get_started}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Getting Started | ${appName}`);
                        return <GetStarted/>;
                    }}
                />
                <Route
                    path={paths.audit}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Audit | ${appName}`);
                        return <Audit/>;
                    }}
                />
                <Route
                    path={paths.get_startedAudit}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Getting Started Audit | ${appName}`);
                        return <GetStartedAudit/>;
                    }}
                />
                <Route
                    path={paths.category_setup}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Add shop categories | ${appName}`);
                        return <CategorySetup/>;
                    }}
                />
                <Route
                    path={paths.add_products}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Add products | ${appName}`);
                        return <AddProducts/>;
                    }}
                />

                <Route
                    path={paths.store_summary}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Store summary | ${appName}`);
                        return <StoreSummary/>;
                    }}
                />

                <Route
                    path={paths.sell}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Sell | ${appName}`);
                        return <Sell/>;
                    }}
                />

                <Route
                    path={paths.stock}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Stock | ${appName}`);
                        return <MainViewStock/>;
                    }}
                />
                <Route
                    path={paths.admin}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <Admin />;
                    }}
                />
                <Route
                    path={paths.add_warehouse}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <AddWarehouse />;
                    }}
                />
                <Route
                    path={paths.change_store_info}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <ChangeStoreInformation />;
                    }}
                />
                <Route
                    path={paths.account_info}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <AccountInformation />;
                    }}
                />
                <Route
                    path={paths.verify_phone}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <VerifyPhone />;
                    }}
                />
                <Route
                    path={paths.change_price}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Admin | ${appName}`);
                        return <ChangePrice />;
                    }}
                />

                <Route
                    path={paths.suppliers}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Suppliers | ${appName}`);
                        return <Suppliers/>;
                    }}
                />
                <Route
                    path={paths.view_suppliers}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Suppliers | ${appName}`);
                        return <ViewSuppliers/>;
                    }}
                />
                <Route
                    path={paths.supplier_detail}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Supplier | ${appName}`);
                        return <SupplierDetails/>;
                    }}
                />
                <Route
                    path={paths.pay_supplier}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Supplier | ${appName}`);
                        return <PaySupplier/>;
                    }}
                />
                <Route
                    path={paths.add_supplier_stock}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Supplier | ${appName}`);
                        return <SupplierStock/>;
                    }}
                />
                <Route
                    path={paths.add_supplier}
                    render={() => {
                        setPageBackground();
                        this.setTitle(`Supplier | ${appName}`);
                        return <AddSupplier/>;
                    }}
                />

              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </Router>
        </div>
      </DatabaseProvider>
    );
  }
}

export default App;
