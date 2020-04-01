const cartEntrySchema = {
    name: 'cartEntrySchema',
    columns: [
        {name: 'productId', type: 'string'},
        {name: 'sellingPrice', type: 'number'},
        {name: 'quantity' , type: 'number'},
        {name: 'cartId' , type: 'string'},
        {name: 'discount' , type: 'number'},
        {name: 'costPrice' , type: 'number'},
        {name: 'branchProductId' , type: 'string'},
        {name: 'date' , type: 'number'}
    ]
};

export default cartEntrySchema;