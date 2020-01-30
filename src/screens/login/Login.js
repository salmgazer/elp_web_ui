import React from "react";
import "./Login.scss";
import { withRouter } from "react-router-dom";
import Component from "@reactions/component";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import LocalInfo from "../../services/LocalInfo";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import paths from "../../utilities/paths";

const apiUrl = "";

async function getUserStoreFromLocal(database, user, store) {
  return database.collections
    .get("users_stores")
    .query(Q.where("user_id", user.id), Q.where("store_id", store.id))
    .fetch();
}

async function getUserFromLocal(database, usernameOrPhone, password) {
  return database.collections
    .get("users")
    .query(
      Q.where("username", usernameOrPhone),
      Q.or(Q.where("phone", usernameOrPhone)),
      Q.where("password", password)
    )
    .fetch();
}

async function getStore(database) {
  return database.collections
    .get("stores")
    .query()
    .fetch();
}

async function getUsersFromLocal(database) {
  return database.collections
    .get("users")
    .query()
    .fetch();
}

const Login = props => {
  const { history } = props;
  const database = useDatabase();

  if (LocalInfo.storeId && LocalInfo.userId) {
    history.push(paths.home);
  }

  const login = async ({ usernameOrPhone, password }) => {
    if (password.length < 8 || usernameOrPhone.length === 0) {
      alert("Password or username/phone is incorrect");
      return;
    }

    // try to get store from local db
    let stores = await getStore(database);

    if (!stores || stores.length < 1) {
      //store is not on local db, get from api

      /* @todo create an API access class */
      const storesResponse = await fetch(
        `${apiUrl}/stores?username_or_phone=${usernameOrPhone}`,
        {
          headers: { "Content-Type": "application/json" }
        }
      );
      const storesFromAPI = await storesResponse.json();
      stores = storesFromAPI.data;
    }

    if (stores && stores.length > 0) {
    } else {
      alert(`You are not associated to any store`);
      return;
    }
  };

  return (
    <div>
      <Component
        initialState={{
          isShown: false,
          password: "",
          usernameOrPhone: ""
        }}
      >
        {({ state, setState }) => (
          <React.Fragment>
            <div id="login-form-area">
              <div id="login-form">
                <div className="row">
                  <TextField id="usernameOrPhone" label="username/phone" />
                </div>
                <div className="row">
                  <TextField id="password" type="password" label="Password" />
                </div>
                <div className="row center-text">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => login(state)}
                  >
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </React.Fragment>
        )}
      </Component>
    </div>
  );
};

export default withRouter(Login);
