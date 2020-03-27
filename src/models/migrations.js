import {
  schemaMigrations,
  // addColumns,
  createTable
} from "@nozbe/watermelondb/Schema/migrations";
import customerSchema from "./customers/customerSchema";
import salesSchema from "./sales/salesSchema";

// latest migrations should be at the top entry level of the migrations array
export default schemaMigrations({
  migrations: [
		{
            toVersion: 3,
            steps: [
                createTable(salesSchema),
            ]
		},
		{
			toVersion: 2,
			steps: [
				createTable(customerSchema),
            ]
		},
	]
});



/*export default schemaMigrations({
  migrations: [
		{
			toVersion: 4,
			steps: [
				addColumns({
					table: 'sales',
					columns: [
						{ name: 'sales_total', type: 'number'},
					],
				})
			]
		},
  	{
		toVersion: 3,
		steps: [
			addColumns({
				table: 'sales',
				columns: [
					{ name: 'arrears', type: 'number'},
				],
			})
		]
	},{
		toVersion: 2,
		steps: [
			addColumns({
				table: 'sales',
				columns: [
					{ name: 'payment_status', type: 'string'},
				],
			}),
			createTable({
				name: 'installments',
				columns: [
					{ name: 'amount', type: 'number'},
					{ name: 'sale_id', type: 'string' },
          { name: 'company_id', type: 'string' },
					{ name: 'created_by', type: 'string' },
					{ name: 'created_at', type: 'number' },
					{ name: 'updated_at', type: 'number' },
				],
			}),
		],
	},
	]
});
*/
