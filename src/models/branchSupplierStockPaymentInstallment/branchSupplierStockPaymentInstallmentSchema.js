const branchSupplierStockPaymentInstallmentSchema = {
    name: 'branch_supplier_stock_payment_installments',
    columns : [
        { name: 'amount', type: 'number' },
        { name: 'branchProductStockId', type: 'string' },
        { name: 'branchId', type: 'string' },
        { name: 'createdBy', type: 'string' },
        { name: 'created_at' , type: 'number'},
        { name: 'updated_at' , type: 'number'}
    ]
};

export default branchSupplierStockPaymentInstallmentSchema;
