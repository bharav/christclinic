import * as React from "react";
import styles from "./Patientcarereports.module.scss";
import { IPatientcarereportsProps } from "./IPatientcarereportsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {Bar,Line} from "react-chartjs-2";
import PatientsVisits from "../data/patientsvisits";
import PatientsContribution from "../data/PatientsContribution";
import CycleTime from "../data/CycleTime";
import NoShowRate from "../data/NoShowRate";
import PreventativeService from "../data/PreventativeService";
import SpecialityCare from "../data/SpecialityCare";
import ThirdNextAvailable from "../data/ThirdNextAvailable";
import MonthYear  from "../../../common/component/monthyear";

export interface IPatientcarereportsState {
  title:string;
  data: {};
  graphType:any;
  type:string;
  year:string;
  startmonth:string;
  startyear:string;
  endmonth:string;
  endyear:string;
  ismonthly:boolean;
}
export default class Patientcarereports extends React.Component<IPatientcarereportsProps, IPatientcarereportsState> {
  private _currentyear:number;
  private _currentmonth:number;
  
  constructor(props) {
    super(props);
    this.startmonthyear = this.startmonthyear.bind(this);
    this.endmonthyear = this.endmonthyear.bind(this);
    this._currentyear = (new Date()).getFullYear();
    this._currentmonth =(new Date()).getMonth();
    this.state = {
      title:"Patient Visit",
      type:"bar",
      data: {},
      graphType:"patientvisit",
      year:this._currentyear.toString(),
      startmonth:this._currentmonth.toString(),
      startyear:(this._currentyear-1).toString(),
      endmonth:(this._currentmonth).toString(),
      endyear:this._currentyear.toString(),
      ismonthly:false
    };
  }
  private startmonthyear=(startmonth:string,startyear):void=>{
    this.creategraph(this.state.graphType,this.state.year,true,startmonth,
      startyear,this.state.endmonth,this.state.endyear);
  }
  private endmonthyear=(endmonth:string,endyear):void=>{
    this.creategraph(this.state.graphType,this.state.year,true,this.state.startmonth,
      this.state.startyear,endmonth,endyear);
  }

  private isMonthly=(e: React.FormEvent<HTMLInputElement>):void=>{
    this.creategraph(this.state.graphType,this.state.year,true,this.state.startmonth,
      this.state.startyear,this.state.endmonth,this.state.endyear);
  }
  private isYearly=(e: React.FormEvent<HTMLInputElement>):void=>{
    this.creategraph(this.state.graphType,this.state.year,false,this.state.startmonth,
      this.state.startyear,this.state.endmonth,this.state.endyear);
  }
  private selecthandler=(e: React.FormEvent<HTMLSelectElement>):void=> {
    let selectedgraphType:string = e.currentTarget.value;
    this.creategraph(selectedgraphType,this.state.year,this.state.ismonthly,this.state.startmonth,
    this.state.startyear,this.state.endmonth,this.state.endyear);
    
  }
  private creategraph(graphtype:string,selectedyear:string,ismonthly:boolean,startmonth:string,startyear:string,endmonth:string,endyear:string):void{
    switch(graphtype) {
      case "patientcontribution":{
       let patientcontribution: PatientsContribution= new PatientsContribution();
       patientcontribution.getPatientContribution(selectedyear,ismonthly,startmonth,startyear,endmonth,endyear).then((data:any)=> {
        this.setState({
          title:"Patient Contribution",
          type:"bar",
          graphType:graphtype,
          data:data,
          year:selectedyear,
          ismonthly:ismonthly,
          startmonth:startmonth,
          startyear:startyear,
          endmonth:endmonth,
          endyear:endyear
       });
      });
       break;
      }
      case "cycletime":{
        let cycletime: CycleTime= new CycleTime();
         cycletime.getCycleTime(selectedyear,ismonthly,startmonth,startyear,endmonth,endyear).then((data:any)=> {
          this.setState({
            title:"Cycle Time",
            type:"bar",
            graphType:graphtype,
            data:data,
            year:selectedyear,
            ismonthly:ismonthly,
            startmonth:startmonth,
            startyear:startyear,
            endmonth:endmonth,
            endyear:endyear
           
         });
        });
        break;
       }
       case "noshowrate":{
        let noshowrate: NoShowRate= new NoShowRate();
        noshowrate.getNoShowRate(selectedyear,ismonthly,startmonth,startyear,endmonth,endyear).then((data:any)=> {
          this.setState({
            title:"No Show Rate",
            type:"bar",
            graphType:graphtype,
            data:data,
            year:selectedyear,
            ismonthly:ismonthly,
            startmonth:startmonth,
            startyear:startyear,
            endmonth:endmonth,
            endyear:endyear
          });
        });
        break;
       }
       case "preventativeservice":{
        let preventativeservice: PreventativeService= new PreventativeService();
        preventativeservice.getPreventativeService(selectedyear,ismonthly,startmonth,startyear,endmonth,endyear).then((data:any)=> {
          this.setState({
            title:"Preventative Services",
            type:"bar",
            graphType:graphtype,
            data:data,
            year:selectedyear,
            ismonthly:ismonthly,
            startmonth:startmonth,
            startyear:startyear,
            endmonth:endmonth,
            endyear:endyear
         });
        });
        break;
       }
       case "specialitycare":{
        let specialitycare: SpecialityCare= new SpecialityCare();
        specialitycare.getSpecialityCare(selectedyear,ismonthly,startmonth,startyear,endmonth,endyear).then((data:any)=> {
          this.setState({
            title:"Speciality Care",
            type:"bar",
            graphType:graphtype,
            data:data,
            year:selectedyear,
            ismonthly:ismonthly,
            startmonth:startmonth,
            startyear:startyear,
            endmonth:endmonth,
            endyear:endyear
         });
        });
        break;
       }
       case "thirdnextavailable":{
        let thirdnextavailable: ThirdNextAvailable= new ThirdNextAvailable();
        thirdnextavailable.getThirdNextAvailable(selectedyear,ismonthly,startmonth,startyear,endmonth,endyear).then((data:any)=> {
          this.setState({
            title:"Third Next Available",
            type:"liner",
            graphType:graphtype,
            data:data,
            year:selectedyear,
            ismonthly:ismonthly,
            startmonth:startmonth,
            startyear:startyear,
            endmonth:endmonth,
            endyear:endyear
         });
        });
        break;
       }
      default:{
        let patientvisits:PatientsVisits = new PatientsVisits();
        patientvisits.getPatientVisits(selectedyear,ismonthly,startmonth,startyear,endmonth,endyear).then((data:any)=> {
          this.setState({
            type:"bar",
              graphType:graphtype,
              data:data,
              year:selectedyear,
              ismonthly:ismonthly,
              startmonth:startmonth,
              startyear:startyear,
              endmonth:endmonth,
              endyear:endyear
        });
      });
      }
    }
  }
  private changeyear=(e: React.FormEvent<HTMLSelectElement>):void=> {
    let selectedyear:string = e.currentTarget.value;
    this.creategraph(this.state.graphType,selectedyear,this.state.ismonthly,this.state.startmonth,
      this.state.startyear,this.state.endmonth,this.state.endyear);
      
  }
  public componentDidMount():void{
    let patientvisits:PatientsVisits = new PatientsVisits();
    debugger;
      patientvisits.getPatientVisits(this.state.year,this.state.ismonthly,this.state.startmonth,this.state.startyear,this.state.endmonth,this.state.endyear).then((data:any)=> {
        this.setState({
          data:data
      });
    });
  }
  public render(): React.ReactElement<IPatientcarereportsProps> {
    const chart:JSX.Element=this.state.type==="bar"?<Bar data={this.state.data} />:<Line data={this.state.data} />;
    return (
        <div>
          <form className="form-horizontal" role="form">
        <label><input type="radio" name="ismonthly" checked={this.state.ismonthly===true} onChange={e=>this.isMonthly(e)}/>Monthwise</label>
        <label><input type="radio" name="ismonthly" checked={this.state.ismonthly===false} onChange={e=>this.isYearly(e)}/> YearWise</label>
          <div>
            <div>
                  <label className="col-sm-2 control-label">Select Report : </label>
                  <div className="col-sm-4">
                  <select disabled={this.state.ismonthly} className="form-control" id="reportType" onChange={e => this.selecthandler(e)} value={this.state.graphType}>
                          <option value="">Select</option>
                          <option value="patientvisit">Patient Visit</option>
                          <option value="patientcontribution">Patient Contribution</option>
                          <option value="cycletime">Cycle Time</option>
                          <option value="noshowrate">No Show Rate</option>
                          <option value="preventativeservice">Preventative Service</option>
                          <option value="specialitycare">Speciality Care</option>
                          <option value="thirdnextavailable">Third Next Available</option>
                    </select>
                  </div>
              </div>
              <div>
                  <label className="col-sm-2 control-label">Select Year : </label>
                  <div className="col-sm-4">
                  <select disabled={this.state.ismonthly} className="form-control" value={this.state.year} onChange={e => this.changeyear(e)}>
                      <option>Select</option>
                      <option value={this._currentyear}>{this._currentyear}</option>
                      <option value={this._currentyear-1}>{this._currentyear-1}</option>
                      <option value={this._currentyear-2}>{this._currentyear-2}</option>
                    </select>
                  </div>
              </div>
              <div>
                <label className="col-sm-2 control-label">From : </label>
                <MonthYear disabled={!this.state.ismonthly} selectedMonth={this.state.startmonth} selectedYear={this.state.startyear} onChange={this.startmonthyear} />
                </div>
                <label className="col-sm-2 control-label"> To: </label>
                <MonthYear disabled={!this.state.ismonthly} selectedMonth={this.state.endmonth} selectedYear={this.state.endyear} onChange={this.endmonthyear} />
              </div>
            <div>
            <label className="col-sm-2 control-label">From : </label>
                  <div className="col-sm-4">
                  
                    
                  </div>
                  
            </div>
          </form>
              <div>
                  <h1>{this.state.title} For the Year {this.state.year}</h1>
                  {chart}
             </div>
       </div>
    );
  }
}
