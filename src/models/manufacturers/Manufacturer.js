import { Model } from '@nozbe/watermelondb'
import {field, date, readonly, children} from '@nozbe/watermelondb/decorators';

export default class Manufacturer extends Model {
  static table = 'manufacturers';
  static deletable = false;

  static associations = {
    products: { type: 'has_many', foreignKey: 'manufacturerId' },
  };

  @field('name') name;
  @readonly @date('createdAt') createdAt;
  @readonly @date('updatedAt') updatedAt;
  @children('products') products;
}
