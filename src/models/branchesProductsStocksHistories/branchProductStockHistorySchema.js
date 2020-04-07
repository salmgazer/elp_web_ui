
const branchProductStockHistorySchema = {
  name: 'branches_products_stocks_histories',
  columns: [
    { name: 'branchProductStockId', type: 'string' },
    //{ name: 'branchProductId', type: 'string' },
    { name: 'quantity', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ]
};

export default branchProductStockHistorySchema;
