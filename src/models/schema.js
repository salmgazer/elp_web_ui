import { appSchema, tableSchema } from "@nozbe/watermelondb";

import storeSchema from "./stores/storeSchema";
import userSchema from "./users/userSchema";
import userStoreSchema from "./usersStores/userStoreSchema";

export default appSchema({
  version: 1,
  tables: [
    tableSchema(userSchema),
    tableSchema(userStoreSchema),
    tableSchema(storeSchema)
  ]
});
