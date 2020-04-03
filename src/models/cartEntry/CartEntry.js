import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import cartEntrySchema from './cartEntrySchema';

export default class CartEntry extends Model {
    static table = 'cartEntries';
    static deletable = true;

    static associations = {
        carts: { type: 'belongs_to' , key: 'cart_id'},
        customers: { type: 'belongs_to' , key: 'customerId'}
    };

    static displayColumn = 'id';

    static columns = cartEntrySchema.columns.map(c => c.name);

    @relation('customers', 'customerId') customer;
    @relation('carts', 'cart_id') cart;
    @field('branchId') branchId;
    @field('branchProductId') branchProductId;
    @field('productId') productId;
    @field('sellingPrice') sellingPrice;
    @field('costPrice') costPrice;
    @field('discount') discount;
    @field('quantity') quantity;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}