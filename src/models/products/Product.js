import { Model } from '@nozbe/watermelondb';
import { field, date, text, readonly, relation} from '@nozbe/watermelondb/decorators';
import * as Q from "@nozbe/watermelondb/QueryDescription";

export default class Product extends Model {
  static table = 'products';
  static deletable = false;

  static associations = {
    brands: { type: 'belongs_to', key: 'brandId' },
    product_categories: { type: 'belongs_to', key: 'productCategoryId' },
    manufacturers: { type: 'belongs_to', key: 'manufacturerId' },
  };

  @field('name') name;
  @text('description') description;
  @field('measurementUnit') measurementUnit;
  @field('barCode') barCode;
  @field('manufacturerId') manufacturerId;
  @field('brandId') brandId;
  @field('productCategoryId') productCategoryId;
  @relation('brands', 'brandId') brand;
  @relation('product_categories', 'productCategoryId') productCategory;
  @relation('manufacturers', 'manufacturerId') manufacturer;
  @relation('users', 'createdBy') createdBy;
  @readonly @date('createdAt') createdAt;
  @readonly @date('updatedAt') updatedAt;

  async stocks(branchId) {
    return this.collections
      .get('branches_products_stocks')
      .query(Q.where('productId', this.id), Q.where('branchId', branchId));
  }
}
