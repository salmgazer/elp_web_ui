const productCategorySchema = {
  name: 'product_categories',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'parentId', type: 'number' },
    { name: 'createdBy', type: 'string' },
    { name: 'createdAt', type: 'number' },
    { name: 'updatedAt', type: 'number' },
  ]
};

export default productCategorySchema;
