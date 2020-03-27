const salesSchema = {
    name: 'sales',
    columns: [
        { name: 'note', type: 'string', isOptional: true },
        { name: 'type', type: 'string' },
        { name: 'paymentStatus', type: 'string' },
        { name: 'customerId', type: 'string' },
        { name: 'discount', type: 'number' },
        { name: 'branchId', type: 'string' },
        { name: 'receiptNumber', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'createdAt', type: 'number' },
        { name: 'updatedAt', type: 'number' },
    ]
};

export default salesSchema;
