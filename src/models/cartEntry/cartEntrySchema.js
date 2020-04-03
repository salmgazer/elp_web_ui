const cartEntrySchema = {
    name: 'cartEntries',
    columns: [
        {name: 'productId', type: 'string'},
        {name: 'customerId', type: 'string' , isOptional: true},
        {name: 'sellingPrice', type: 'number'},
        {name: 'quantity' , type: 'number'},
        {name: 'cartId' , type: 'string'},
        {name: 'discount' , type: 'number'},
        {name: 'costPrice' , type: 'number'},
        {name: 'branchId' , type: 'string'},
        {name: 'branchProductId' , type: 'string'},
        {name: 'createdAt' , type: 'number'},
        {name: 'updatedAt' , type: 'number'}
    ]
};

export default cartEntrySchema;