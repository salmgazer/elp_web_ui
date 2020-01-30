import { Model } from "@nozbe/watermelondb";
import { field, date, readonly } from "@nozbe/watermelondb/decorators";
import { Q } from "@nozbe/watermelondb";

export default class Store extends Model {
  static table = "stores";
  static deletable = true;

  static associations = {
    users_stores: { type: "has_many", foreignKey: "store_id" }
  };

  @field("name") name;
  @field("address") address;
  @field("phone") phone;
  @field("description") description;
  @field("location_name") locationName;
  @field("location_gps") locationGps;
  @field("status") status;
  @field("logo") logo;
  @readonly @date("created_at") createdAt;
  @readonly @date("updated_at") updatedAt;

  async remove() {
    await this.markAsDeleted(); // syncable
  }

  owner = this.collections
    .get("users")
    .query(Q.on("users_stores", "user_id", this.id));
}
