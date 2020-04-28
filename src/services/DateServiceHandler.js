import LocalInfo from "./LocalInfo";
import fromUnixTime from "date-fns/fromUnixTime";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import format from "date-fns/format";

export default class DateServiceHandler{
    constructor(){
        //this.type = type;
        this.branchCreated = (LocalInfo.branches.filter(branch => branch.id === LocalInfo.branchId)[0]).created_at;
    }

    getStoreWeeks(startDate = new Date(fromUnixTime(this.branchCreated)) , endDate = new Date()){
        const weeks = eachWeekOfInterval({
            start: startDate,
            end: endDate
        }).reverse();

        return weeks.map((week , index) => {
            if(weeks.length !== index + 1){
                return {
                    value: format(week, 'MM/dd/yyyy'),
                    label: `Week ${index + 1}: ${format(week , 'eee, do MMMM, yyyy')} - ${format(weeks[index + 1] , 'eee, do MMMM, yyyy')}`
                }
            }else{
                return {
                    value: format(week, 'MM/dd/yyyy'),
                    label: `Week ${index + 1}: ${format(week , 'eee, do MMMM, yyyy')} - ${format(new Date() , 'eee, do MMMM, yyyy')}`
                }
            }
        });
    }
}
