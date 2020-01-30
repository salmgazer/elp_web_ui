import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "./schema";
import Store from "./stores/Store";
import User from "./users/User";
import UserStore from "./usersStores/UserStore";

const adapter = new LokiJSAdapter({
  schema
});

export default new Database({
  adapter,
  modelClasses: [Store, User, UserStore],
  actionsEnabled: true
});
