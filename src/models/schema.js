import { appSchema, tableSchema } from "@nozbe/watermelondb";
import brandSchema from "./brands/brandSchema";
import manufacturerSchema from "./manufacturers/manufacturerSchema";
import productCategorySchema from "./productCategories/productCategorySchema";
import productSchema from "./products/productSchema";
import branchProductSchema from "./branchesProducts/branchProductSchema";
import branchProductStockSchema from "./branchesProductsStocks/branchProductStockSchema";
import branchProductStockHistorySchema from "./branchesProductsStocksHistories/branchProductStockHistorySchema";


export default appSchema({
  version: 1,
  tables: [
    tableSchema(brandSchema),
    tableSchema(manufacturerSchema),
    tableSchema(productCategorySchema),
    tableSchema(productSchema),
    tableSchema(branchProductSchema),
    tableSchema(branchProductSchema),
    tableSchema(branchProductStockSchema),
    tableSchema(branchProductStockHistorySchema)
  ]
});
