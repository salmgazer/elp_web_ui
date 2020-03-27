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
    Customer
  ],
  actionsEnabled: true
});
