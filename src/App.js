import React from "react";
import "./App.scss";
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
import NewDashboard from "./screens/newDashboard/Dashboard";
import Audit from "./screens/audit/Audit";

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
                path={paths.audit}
                render={() => {
                  this.setTitle(`Audit | ${appName}`);
                  return <Audit />;
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
                exact
                path={paths.new_dashboard}
                render={() => {
                    this.setTitle(`Dashboard | ${appName}`);
                    return <NewDashboard />;
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
