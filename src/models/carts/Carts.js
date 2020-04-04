import { Model } from '@nozbe/watermelondb';
import { field, date, text, relation} from '@nozbe/watermelondb/decorators';
import cartsSchema from './cartsSchema';

export default class Carts extends Model {
    static table = 'carts';
    static deletable = true;

    static associations = {
        cart_entries: { type: 'has_many', key: 'cart_id' },
    };

    static displayColumn = 'id';

    @relation('customers' , 'customerId') customer;
    @field('discount') discount;
    @field('branchId') branchId;
    @field('status') status;
    @field('customerId') customerId;
    @field('createdBy') createdBy;
    @date('created_at') createdAt;
    @date('updated_at') updatedAt;

    static columns = cartsSchema.columns.map(c => c.name);

}