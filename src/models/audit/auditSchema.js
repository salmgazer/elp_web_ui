const auditSchema = {
    name: 'audits',
    columns: [
        { name: 'branchId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default auditSchema;
