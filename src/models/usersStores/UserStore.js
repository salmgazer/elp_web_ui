import { field } from "@nozbe/watermelondb/decorators";
import { Model } from "@nozbe/watermelondb";

export default class UserStore extends Model {
  static table = "users_stores";

  static associations = {
    stores: { type: "belongs_to", key: "store_id" },
    users: { type: "belongs_to", key: "user_id" }
  };

  @field("user_id") userId;
  @field("store_id") storeId;
  @field("role") role;

  async remove() {
    await this.markAsDeleted(); // syncable
  }
}
