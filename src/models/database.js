import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";
import schema from "./schema";
import Brand from "./brands/Brand";
import Manufacturer from "./manufacturers/Manufacturer";
import ProductCategory from "./productCategories/ProductCategory";
import Product from "./products/Product";
import BranchProduct from "./branchesProducts/BranchProduct";
import BranchProductStock from "./branchesProductsStocks/BranchProductStock";
import BranchProductStockHistory from "./branchesProductsStocksHistories/BranchProductStockHistory";
import Customer from "./customers/Customer";
import migrations from "./migrations";
import Sales from "./sales/Sales";
import Carts from "./carts/Carts";
import CartEntry from "./cartEntry/CartEntry";
import SaleEntry from "./saleEntry/SaleEntries";
import BranchCustomer from "./branchesCustomer/BranchCustomer";
import SaleInstallment from "./saleInstallments/SaleInstallment";
import BranchPurchases from "./branchPurchases/BranchPurchases";
import StockMovement from "./stockMovements/StockMovement";
import Audits from "./audit/Audit";
import AuditEntries from "./auditEntry/AuditEntries";

import SuppliersCompany from "./suppliers_company/SuppliersCompany";
import BranchSuppliers from "./branchSuppliers/BranchSuppliers";
import BranchSupplierProducts from "./branchSupplierProducts/BranchSupplierProducts";
import BranchSupplierSalespersons from "./branchSupplierSalespersons/BranchSupplierSalespersons";
import BranchSupplierOrder from "./branchSupplierOrder/BranchSupplierOrder";
import BranchSupplierOrderPaymentInstallment from "./branchSupplierOrderPaymentInstallment/BranchSupplierOrderPaymentInstallment";


const adapter = new LokiJSAdapter({
  schema,
  migrations
});

export default new Database({
  adapter,
  modelClasses: [
    Brand,
    Manufacturer,
    ProductCategory,
    Product,
    BranchProduct,
    BranchProductStock,
    BranchProductStockHistory,
    Customer,
    Sales,
    Carts,
    CartEntry,
    SaleEntry,
    BranchCustomer,
    SaleInstallment,
    BranchPurchases,
    StockMovement,
    Audits,
    AuditEntries,
    SuppliersCompany,
    BranchSuppliers,
    BranchSupplierProducts,
    BranchSupplierSalespersons,
    BranchSupplierOrder,
    BranchSupplierOrderPaymentInstallment,
  ],
  actionsEnabled: true
});
