const auditCartSchema = {
    name: 'audit_carts',
    columns: [
        { name: 'branchId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'isActive', type: 'boolean' },
        {name: 'auditDate' , type: 'number'},
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default auditCartSchema;
