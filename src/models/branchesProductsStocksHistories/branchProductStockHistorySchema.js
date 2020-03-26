
const branchProductStockHistorySchema = {
  name: 'branches_products_stocks_histories',
  columns: [
    { name: 'branchProductStockId', type: 'number' },
    { name: 'quantity', type: 'number' },
    //{ name: 'createdBy', type: 'string' },
    { name: 'createdAt', type: 'number' },
    { name: 'updatedAt', type: 'number' },
  ]
};

export default branchProductStockHistorySchema;
