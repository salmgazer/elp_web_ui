import { Model } from '@nozbe/watermelondb'
import {field, date, readonly, children, relation} from '@nozbe/watermelondb/decorators';

export default class ProductCategories extends Model {
  static table = 'product_categories';
  static deletable = false;

  static associations = {
    products_categories: { type: 'belongs_to', foreignKey: 'parentId' },
  };

  @field('name') name;
  @field('parentId') number;
  @relation('product_categories', 'parentId') parentProductCategory;
  @readonly @date('createdAt') createdAt;
  @readonly @date('updatedAt') updatedAt;
  @children('products') products;
}
