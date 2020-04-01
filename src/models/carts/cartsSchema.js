const cartsSchema = {
    name: 'carts',
    columns : [
        { name: 'customerId', type: 'string', isOptional: true },
        { name: 'discount', type: 'number' },
        { name: 'branchId', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'createdAt', type: 'number' },
        { name: 'updatedAt', type: 'number' },
    ]
};

export default cartsSchema;