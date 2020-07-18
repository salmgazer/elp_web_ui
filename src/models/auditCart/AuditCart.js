import { Model } from '@nozbe/watermelondb';
import {field, date, children, readonly} from '@nozbe/watermelondb/decorators';
import auditCartSchema from "./auditCartSchema";
import { Q } from '@nozbe/watermelondb';

export default class AuditCarts extends Model {
    static table = 'audit_carts';
    static deletable = false;

    static associations = {
        audit_cart_entries: { type: 'has_many', key: 'auditId' },
    };

    static displayColumn = 'id';

    @field('branchId') branchId;
    @field('createdBy') createdBy;
    @children('auditEntries') audit_cart_entries;
    @field('status') status;
    @field('isActive') isActive;
    @field('auditDate') auditDate;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    auditEntries = this.collections
        .get('audit_cart_entries')
        .query(Q.where('auditId' , this.id));

    static columns = auditCartSchema.columns.map(c => c.name);
}
