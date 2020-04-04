import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';

export default class BranchProductStockHistory extends Model {
  static table = 'branches_products_stocks_histories';
  static deletable = false;

  static associations = {
    branches_products_stocks: { type: 'belongs_to', key: 'branchProductStockId' },
  };

  @field('branchProductStockId') branchProductStockId;
  @field('quantity') quantity;
  @relation('branches_products_stocks', 'branchProductStockId') branchProductStock;
  //@relation('users', 'createdBy') createdBy;
  @readonly @date('created_at') createdAt;
  @readonly @date('updated_at') updatedAt;
}
