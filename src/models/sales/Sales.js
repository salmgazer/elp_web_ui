import { Model } from '@nozbe/watermelondb';
import { field, date, text, relation} from '@nozbe/watermelondb/decorators';
import salesSchema from "./salesSchema";
import {lazy } from '@nozbe/watermelondb/decorators'
import { Q } from '@nozbe/watermelondb'


export default class Sales extends Model {
    static table = 'sales';
    static deletable = false;

    static associations = {
        customers: { type: 'belongs_to', key: 'customerId' },
        saleEntries: {type: 'has_many' , foreignKey: 'saleId'}
    };

    static displayColumn = 'receiptNumber';

    @field('note') note;
    @text('type') type;
    @field('paymentStatus') paymentStatus;
    @field('paymentType') paymentType;
    @relation('customers' , 'customerId') customer;
    @field('discount') discount;
    @field('branchId') branchId;
    @field('customerId') customerId;
    @field('receiptNumber') receiptNumber;
    @field('createdBy') createdBy;
    @date('createdAt') created_at;
    @date('updatedAt') updated_at;

    @lazy
    salesEntries = this.collections
        .get('saleEntires')
        .query(Q.on('saleEntries' , 'saleId' , this.id));

    static columns = salesSchema.columns.map(c => c.name);
}
