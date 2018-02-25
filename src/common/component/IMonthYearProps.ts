export default interface IMonthYear{
    onChange(selectedMonth:string,selectedYear:string):void;
    selectedMonth:string;
    selectedYear:string;
    disabled:boolean;
}
