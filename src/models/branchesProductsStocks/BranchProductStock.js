import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';

export default class BranchProductStock extends Model {
  static table = 'branches_products_stocks';
  static deletable = false;

  static associations = {
    branches_products: { type: 'belongs_to', key: 'branchProductId' },
    products: { type: 'belongs_to', key: 'productId' },
  };

  @field('branchProductId') branchProductId;
  @field('branchId') branchId;
  @field('productId') productId;
  @field('quantity') quantity;
  @field('costPrice') costPrice;
  @relation('products', 'productId') product;
  @relation('branches_products', 'branchProductId') branchProduct;
  //@relation('users', 'createdBy') createdBy;
  @readonly @date('createdAt') createdAt;
  @readonly @date('updatedAt') updatedAt;
}
