import { Model } from '@nozbe/watermelondb';
import {field, date, relation, readonly} from '@nozbe/watermelondb/decorators';
import auditCartEntrySchema from './auditCartEntriesSchema';

export default class AuditCartEntries extends Model {
    static table = 'audit_cart_entries';
    static deletable = false;

    static associations = {
        audit_carts: { type: 'belongs_to' , key: 'auditId'},
        branchProducts: { type: 'belongs_to' , key: 'branchProductId'},
        products: { type: 'belongs_to' , key: 'productId'}
    };

    static displayColumn = 'id';

    static columns = auditCartEntrySchema.columns.map(c => c.name);

    @relation('audits', 'auditId') audit_carts;
    @relation('products', 'productId') product;
    @field('branchId') branchId;
    @field('branchProductId') branchProductId;
    @field('quantityCounted') quantityCounted;
    @field('storeQuantity') storeQuantity;
    @field('productId') productId;
    @field('auditId') auditId;
    @field('sellingPrice') sellingPrice;
    @field('costPrice') costPrice;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;
}
