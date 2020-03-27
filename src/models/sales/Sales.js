import { Model } from '@nozbe/watermelondb';
import { field, date, text, relation} from '@nozbe/watermelondb/decorators';
import salesSchema from "./salesSchema";

export default class Sales extends Model {
    static table = 'sales';
    static deletable = false;

    static associations = {
        customers: { type: 'belongs_to', key: 'customerId' },
    };

    static displayColumn = 'receiptNumber';

    @field('note') note;
    @text('type') type;
    @field('paymentStatus') paymentStatus;
    @relation('customers' , 'customerId') customer;
    @field('discount') discount;
    @field('branchId') branchId;
    @field('customerId') customerId;
    @field('receiptNumber') receiptNumber;
    @field('createdBy') createdBy;
    @date('createdAt') createdAt;
    @date('updatedAt') updatedAt;

    static columns = salesSchema.columns.map(c => c.name);
}
