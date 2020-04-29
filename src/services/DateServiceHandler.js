import LocalInfo from "./LocalInfo";
import fromUnixTime from "date-fns/fromUnixTime";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import eachMonthOfInterval from "date-fns/eachMonthOfInterval"
import eachYearOfInterval from "date-fns/eachYearOfInterval"
import lastDayOfMonth from "date-fns/lastDayOfMonth";
import startOfMonth from "date-fns/startOfMonth";
import startOfYear from "date-fns/startOfYear";
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

    getStoreMonths(startDate = new Date(startOfYear(new Date())) , endDate = new Date(lastDayOfMonth(new Date()))){
        const months = eachMonthOfInterval({
            start: startDate,
            end: endDate
        });

        return months.map((month , index) => {
            if(months.length !== index + 1){
                return {
                    value: format(month, 'MM/dd/yyyy'),
                    label: `${format(month , 'MMMM')}`
                }
            }else{
                return {
                    value: format(month, 'MM/dd/yyyy'),
                    label: `${format(month , 'MMMM')}`
                }
            }
        });
    }

    getStoreYears(startDate = new Date(startOfYear(new Date())) , endDate = new Date(lastDayOfMonth(new Date()))){
        const years = eachYearOfInterval({
            start: startDate,
            end: endDate
        });

        return years.map((year , index) => {
            if(years.length !== index + 1){
                return {
                    value: format(year, 'MM/dd/yyyy'),
                    label: `${format(year , 'yyyy')} `
                }
            }else{
                return {
                    value: format(year, 'MM/dd/yyyy'),
                    label: `${format(year , 'yyyy')}`
                }
            }
        });
    }
}
