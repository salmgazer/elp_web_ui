import { Model } from '@nozbe/watermelondb';
import {field, date, text, relation, children, readonly} from '@nozbe/watermelondb/decorators';
import salesSchema from "./salesSchema";

export default class Sales extends Model {
    static table = 'sales';
    static deletable = false;

    static associations = {
        saleEntries: { type: 'has_many', key: 'saleId' },
        saleInstallments: { type: 'has_many', key: 'saleId' },
        customer: {type: 'belongs_to' , key: 'customerId'},
    };

    static displayColumn = 'id';

    @relation('customers' , 'customerId') customer;
    @field('discount') discount;
    @text('type') type;
    @field('note') note;
    @field('branchId') branchId;
    @field('paymentType') paymentType;
    @field('customerId') customerId;
    @field('createdBy') createdBy;
    @field('receiptNumber') receiptNumber;
    @children('saleEntries') sale_entries;
    @children('saleInstallments') saleInstallments;

    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    /*@lazy
    salesEntries = this.collections
        .get('saleEntires')
        .query(Q.on('saleEntries' , 'saleId' , this.id));*/

    static columns = salesSchema.columns.map(c => c.name);
}
