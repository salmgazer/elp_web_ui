const productSchema = {
  name: 'products',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'description', type: 'string', isOptional: true },
    { name: 'measurementUnit', type: 'string', isOptional: true },
    { name: 'barCode', type: 'string' },
    { name: 'manufacturerId', type: 'number' },
    { name: 'brandId', type: 'number' },
    { name: 'productCategoryId', type: 'number' },
    { name: 'createdBy', type: 'string' },
    { name: 'createdAt', type: 'number' },
    { name: 'updatedAt', type: 'number' },
  ]
};

export default productSchema;
