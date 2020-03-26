const branchProductStockSchema = {
  name: 'branches_products_stocks',
  columns: [
    { name: 'branchProductId', type: 'number' },
    { name: 'branchId', type: 'number' },
    { name: 'productId', type: 'number' },
    { name: 'quantity', type: 'number' },
    { name: 'costPrice', type: 'number' },
    //{ name: 'createdBy', type: 'string' },
    { name: 'createdAt', type: 'number' },
    { name: 'updatedAt', type: 'number' },
  ]
};

export default branchProductStockSchema;
