import { Model } from '@nozbe/watermelondb';
import { field, date, text, relation} from '@nozbe/watermelondb/decorators';
import cartEntrySchema from './cartEntrySchema';

export default class CartEntry extends Model {
    static table = 'cartsEntry';
    static deletable = true;

    /*static associations = {

    };*/
}