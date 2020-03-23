const branchProductSchema = {
  name: 'branches_products',
  columns: [
    { name: 'branchId', type: 'number' },
    { name: 'productId', type: 'number' },
    { name: 'lowestStock', type: 'number' },
    { name: 'sellingPrice', type: 'number' },
    { name: 'createdBy', type: 'string' },
    { name: 'createdAt', type: 'number' },
    { name: 'updatedAt', type: 'number' },
  ]
};

export default branchProductSchema;
