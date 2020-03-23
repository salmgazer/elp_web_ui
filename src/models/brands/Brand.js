import { Model } from '@nozbe/watermelondb'
import {field, date, readonly, children} from '@nozbe/watermelondb/decorators';

export default class Brand extends Model {
  static table = 'brands';
  static deletable = false;

  static associations = {
    products: { type: 'has_many', foreignKey: 'brandId' },
  };

  @field('name') name;
  @readonly @date('createdAt') createdAt;
  @readonly @date('updatedAt') updatedAt;
  @children('products') products;
}
