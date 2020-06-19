import SaleService from "./SaleService";
import PurchaseService from "./PurchaseService";

export default class StockMovementService {
    /*
    * 1. Get all sales
    * 2. Get all stocks
    * 3. Get all sales returns
    * 4. Get all stock returns
    * 5. Get all stock movements between branch
    * 6. Merge all arrays.
    * 7. Add type of history
    * */
    static async getStockMovementListByDate(duration , date){
        //Get sales of date
        const sales = await SaleService.getSalesHistory(duration , date);

        //Get stocks of date
        const stocks = await PurchaseService.getPurchaseHistory(duration , date);


    }
}
