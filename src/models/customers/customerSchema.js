const customerSchema = {
  name: 'customers',
  columns: [
    { name: 'name', type: 'string' },
    { name: 'createdBy', type: 'string' },
    { name: 'phone', type: 'string' },
    { name: 'location', type: 'string' },
    {name: 'created_at' , type: 'number'},
    {name: 'updated_at' , type: 'number'}
  ]
};

export default customerSchema;
