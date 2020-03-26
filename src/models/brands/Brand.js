import { Model } from '@nozbe/watermelondb'
import {field, date, readonly, children} from '@nozbe/watermelondb/decorators';
import productSchema from "../products/productSchema";

export default class Brand extends Model {
  static table = 'brands';
  static deletable = false;

  static associations = {
    products: { type: 'has_many', foreignKey: 'brandId' },
  };

  static displayColumn = 'name';

  static columns = productSchema.columns.map(c => c.name);

  @field('name') name;
  @readonly @date('createdAt') createdAt;
  @readonly @date('updatedAt') updatedAt;
  @children('products') products;
}
