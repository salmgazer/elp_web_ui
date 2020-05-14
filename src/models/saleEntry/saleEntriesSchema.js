const saleEntriesSchema = {
    name: 'saleEntries',
    columns : [
        {name: 'productId', type: 'string'},
        {name: 'customerId', type: 'string' , isOptional: true},
        {name: 'sellingPrice', type: 'number'},
        {name: 'quantity' , type: 'number'},
        {name: 'saleId' , type: 'string'},
        {name: 'discount' , type: 'number'},
        {name: 'costPrice' , type: 'number'},
        {name: 'branchId' , type: 'string'},
        {name: 'entryDate' , type: 'string'},
        {name: 'branchProductId' , type: 'string'},
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default saleEntriesSchema;
