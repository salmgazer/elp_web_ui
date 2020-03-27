const customerSchema = {
  name: 'customers',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'createdBy', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'location', type: 'string' },
    { name: 'createdAt', type: 'number' },
    { name: 'updatedAt', type: 'number' },
  ]
};

export default customerSchema;
