const saleInstallmentSchema = {
    name: 'saleInstallments',
    columns : [
        {name: 'saleId', type: 'string'},
        {name: 'customerId', type: 'string'},
        {name: 'branchId', type: 'string'},
        {name: 'amount', type: 'number'},
        {name: 'createdBy' , type: 'string'},
        {name: 'created_at' , type: 'number'},
        {name: 'updated_at' , type: 'number'}
    ]
};

export default saleInstallmentSchema;
