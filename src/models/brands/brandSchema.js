const brandSchema = {
  name: 'brands',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'createdBy', type: 'string' },
    { name: 'createdAt', type: 'number' },
    { name: 'updatedAt', type: 'number' },
  ]
};

export default brandSchema;
