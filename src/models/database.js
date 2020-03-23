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

const adapter = new LokiJSAdapter({
  schema
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
    BranchProductStockHistory
  ],
  actionsEnabled: true
});
