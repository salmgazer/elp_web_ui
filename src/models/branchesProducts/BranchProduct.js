import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';
import * as Q from "@nozbe/watermelondb/QueryDescription";

export default class BranchProduct extends Model {
  static table = 'branches_products';
  static deletable = false;

  static associations = {
    product: { type: 'belongs_to', key: 'productId' },
  };

  @field('branchId') branchId;
  @field('productId') productId;
  @field('lowestStock') lowestStock;
  @field('sellingPrice') sellingPrice;
  @relation('products', 'productId') product;
  //@relation('users', 'createdBy') createdBy;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;

  async products() {
    return this.collections.get('products')
      .query(Q.where('id', this.productId)).fetch();
  }
}
