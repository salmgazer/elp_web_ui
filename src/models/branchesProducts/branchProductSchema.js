const branchProductSchema = {
  name: 'branches_products',
  columns: [
    { name: 'branchId', type: 'number' },
    { name: 'productId', type: 'number' },
    { name: 'lowestStock', type: 'number' },
    { name: 'sellingPrice', type: 'number' },
    { name: 'created_at', type: 'number' },
    { name: 'updated_at', type: 'number' },
  ]
};

export default branchProductSchema;
