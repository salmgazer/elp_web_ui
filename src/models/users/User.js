import { Model } from "@nozbe/watermelondb";
import {
  field,
  date,
  readonly,
  relation,
  lazy
} from "@nozbe/watermelondb/decorators";
import * as Q from "@nozbe/watermelondb/QueryDescription";

export default class User extends Model {
  static table = "users";
  static deletable = true;

  static associations = {
    users: { type: "belongs_to", key: "created_by" },
    users_stores: { type: "has_many", foreignKey: "user_id" }
  };

  @field("name") name;
  @field("phone") phone;
  @field("address") address;
  @field("username") username;
  @field("email") email;
  @field("status") status;
  @field("profile_picture") profilePicture;
  @relation("users", "created_by") createdBy;
  @field("password") password;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;

  @lazy
  stores = this.collections
    .get("stores")
    .query(Q.on("users_stores", "user_id", this.id));

  @lazy
  ownedStores = this.collections
    .get("stores")
    .query(Q.on("users_stores", "user_id", this.id), Q.where("role", "owner"));

  @lazy
  userStores = this.collections
    .get("stores")
    .query(Q.on("users_stores", "user_id", this.id));

  async ownedStore(storeId) {
    const ownedStore = await this.collections
      .get("users_stores")
      .query(Q.where("user_id", this.id), Q.where("store_id", storeId));
    return ownedStore[0];
  }

  async remove() {
    await this.markAsDeleted(); // syncable
  }
}
