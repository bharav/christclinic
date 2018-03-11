import * as React from "react";
import IMonthYearProps from "./IMonthYearProps";
export interface IMonthYearState{
    selectedMonth:string;
    selectedYear:string;
}

export default class MonthYear extends React.Component<IMonthYearProps,IMonthYearState>{
    private _currentyear:number;
    constructor(props:IMonthYearProps){
        super(props);
        this._currentyear = (new Date()).getFullYear();
        
        this.state = {
            selectedMonth:this.props.selectedMonth,
            selectedYear:this.props.selectedYear
        };
    }
    private changemonth=(e: React.FormEvent<HTMLSelectElement>):void=> {
        this.setState({
            selectedMonth:e.currentTarget.value
        });
        this.props.onChange(e.currentTarget.value,this.state.selectedYear);
    }
    private changeyear=(e: React.FormEvent<HTMLSelectElement>):void=> {
        this.setState({
            selectedYear:e.currentTarget.value
        });
        this.props.onChange(this.state.selectedMonth,e.currentTarget.value);
    }
    public render():React.ReactElement<IMonthYearProps>{
        return(
            <div>
               <div  className="col-sm-12 col-sm6 col-md-6 col-lg-6"> <select disabled={this.props.disabled}  className="form-control" value={this.state.selectedMonth} onChange={e => this.changemonth(e)}>
                      <option>Select</option>
                      <option value="1">January</option>
                      <option value="2">February</option>
                      <option value="3">March</option>
                      <option value="4">April</option>
                      <option value="5">May</option>
                      <option value="6">June</option>
                      <option value="7">July</option>
                      <option value="8">August</option>
                      <option value="9">September</option>
                      <option value="10">October</option>
                      <option value="11">November</option>
                      <option value="12">December</option>
                    </select>
                   </div>
                   <div  className="col-sm-12 col-sm6 col-md-6 col-lg-6">
                    <select disabled={this.props.disabled} className="form-control" value={this.state.selectedYear} onChange={e => this.changeyear(e)}>
                      <option>Select</option>
                      <option value={this._currentyear}>{this._currentyear}</option>
                      <option value={this._currentyear-1}>{this._currentyear-1}</option>
                      <option value={this._currentyear-2}>{this._currentyear-2}</option>
                    </select>
                    </div>
            </div>
        );
    }

}

