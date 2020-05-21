import { Model } from '@nozbe/watermelondb';
import { field, date, readonly, relation} from '@nozbe/watermelondb/decorators';
import branchSupplierOrderSchema from "./branchSupplierOrderSchema";

export default class BranchSupplierOrder extends Model {
    static table = 'branch_supplier_orders';
    static deletable = false;

    /*
    * @todo add branch product relation here
    * */
    static associations = {
        branch_supplier_salespersons: { type: 'belongs_to', key: 'salespersonId' },
        branch_suppliers: { type: 'belongs_to', key: 'branchSupplierId' },
    };

    @field('salespersonId') salespersonId;
    @field('branchId') branchId;
    @field('orderDate') orderDate;
    @field('branchSupplierId') branchSupplierId;
    @field('createdBy') createdBy;
    @relation('branch_supplier_salespersons', 'salespersonId') salesperson;
    @relation('branch_suppliers', 'branchSupplierId') branchSupplier;
    /*
      @relation('branches_products', 'branchProductId') branchProduct;
    */
    //@relation('users', 'createdBy') createdBy;
    @readonly @date('created_at') createdAt;
    @readonly @date('updated_at') updatedAt;

    static columns = branchSupplierOrderSchema.columns.map(c => c.name);

}
