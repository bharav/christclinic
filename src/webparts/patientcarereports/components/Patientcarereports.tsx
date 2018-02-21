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

export interface IPatientcarereportsState {
  title:string;
  data: {};
  graphType:any;
  type:string;
  year:string;
}
export default class Patientcarereports extends React.Component<IPatientcarereportsProps, IPatientcarereportsState> {
  private _currentyear:number;
  constructor(props) {
    super(props);
    this._currentyear = (new Date()).getFullYear();
    this.state = {
      title:"Patient Visit",
      type:"bar",
      data: {},
      graphType:"patientvisit",
      year:this._currentyear.toString()

    };
  }
  private selecthandler=(e: React.FormEvent<HTMLSelectElement>):void=> {
    let selectedgraphType:string = e.currentTarget.value;
    switch(selectedgraphType) {
      case "patientcontribution":{
       let patientcontribution: PatientsContribution= new PatientsContribution();
       patientcontribution.getPatientContribution(this.state.year).then((data:any)=> {
        this.setState({
          title:"Patient Contribution",
          type:"bar",
         graphType:selectedgraphType,
         data:data
       });
      });
       break;
      }
      case "cycletime":{
        let cycletime: CycleTime= new CycleTime();
         cycletime.getCycleTime(this.state.year).then((data:any)=> {
          this.setState({
            title:"Cycle Time",
            type:"bar",
           graphType:selectedgraphType,
           data:data
         });
        });
        break;
       }
       case "noshowrate":{
        let noshowrate: NoShowRate= new NoShowRate();
        noshowrate.getNoShowRate(this.state.year).then((data:any)=> {
          this.setState({
            title:"No Show Rate",
            type:"bar",
           graphType:selectedgraphType,
           data:data
         });
        });
        break;
       }
       case "preventativeservice":{
        let preventativeservice: PreventativeService= new PreventativeService();
        preventativeservice.getPreventativeService(this.state.year).then((data:any)=> {
          this.setState({
            title:"Preventative Services",
            type:"bar",
           graphType:selectedgraphType,
           data:data
         });
        });
        break;
       }
       case "specialitycare":{
        let specialitycare: SpecialityCare= new SpecialityCare();
        specialitycare.getSpecialityCare(this.state.year).then((data:any)=> {
          this.setState({
            title:"Speciality Care",
            type:"bar",
           graphType:selectedgraphType,
           data:data
         });
        });
        break;
       }
       case "thirdnextavailable":{
        let thirdnextavailable: ThirdNextAvailable= new ThirdNextAvailable();
        thirdnextavailable.getThirdNextAvailable(this.state.year).then((data:any)=> {
          this.setState({
            title:"Third Next Available",
            type:"liner",
           graphType:selectedgraphType,
           data:data
         });
        });
        break;
       }
      default:{
        let patientvisits:PatientsVisits = new PatientsVisits();
        patientvisits.getPatientVisits(this.state.year).then((data:any)=> {
          this.setState({
            type:"bar",
            graphType:selectedgraphType,
            data:data
        });
      });
      }
    }
  }
  private changeyear=(e: React.FormEvent<HTMLSelectElement>):void=> {
    let selectedyear:string = e.currentTarget.value;
    switch(this.state.graphType) {
      case "patientcontribution":{
       let patientcontribution: PatientsContribution= new PatientsContribution();
       patientcontribution.getPatientContribution(selectedyear).then((data:any)=> {
        this.setState({
          title:"Patient Contribution ",
          type:"bar",
          data:data,
          year:selectedyear
       });
      });
       break;
      }
      case "cycletime":{
        let cycletime: CycleTime= new CycleTime();
        cycletime.getCycleTime(selectedyear).then((data:any)=> {
          this.setState({
            title:"Cycle Time ",
            type:"bar",
            data:data,
            year:selectedyear
         });
        });
        break;
       }
       case "noshowrate":{
        let noshowrate: NoShowRate= new NoShowRate();
        noshowrate.getNoShowRate(selectedyear).then((data:any)=> {
          this.setState({
            title:"No Show Rate ",
            type:"bar",
            data:data,
            year:selectedyear
         });
        });
        break;
       }
       case "preventativeservice":{
        let preventativeservice: PreventativeService= new PreventativeService();
        preventativeservice.getPreventativeService(selectedyear).then((data:any)=> {
          this.setState({
            title:"Preventative Services ",
            type:"bar",
            data:data,
            year:selectedyear
         });
        });
        break;
       }
       case "specialitycare":{
        let specialitycare: SpecialityCare= new SpecialityCare();
        specialitycare.getSpecialityCare(selectedyear).then((data:any)=> {
          this.setState({
            title:"Speciality Care ",
            type:"bar",
            data:data,
            year:selectedyear
         });
        });
        break;
       }
       case "thirdnextavailable":{
        let thirdnextavailable: ThirdNextAvailable= new ThirdNextAvailable();
        thirdnextavailable.getThirdNextAvailable(selectedyear).then((data:any)=> {
          this.setState({
            title:"Third Next Available ",
            type:"line",
            data:data,
            year:selectedyear
         });
        });
        break;
       }
      default:{
        let patientvisits:PatientsVisits = new PatientsVisits();
        patientvisits.getPatientVisits(selectedyear).then((data:any)=> {
          this.setState({
            data:data,
            year:selectedyear
        });
      });
      }
    }
  }
  public componentDidMount():void{
    let patientvisits:PatientsVisits = new PatientsVisits();
    debugger;
      patientvisits.getPatientVisits(this.state.year).then((data:any)=> {
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
              <div>
                  <label className="col-sm-2 control-label">Select Report : </label>
                  <div className="col-sm-4">
                  <select className="form-control" id="reportType" onChange={e => this.selecthandler(e)} value={this.state.graphType}>
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
                  <select className="form-control" value={this.state.year} onChange={e => this.changeyear(e)}>
                      <option>Select</option>
                      <option value={this._currentyear}>{this._currentyear}</option>
                      <option value={this._currentyear-1}>{this._currentyear-1}</option>
                      <option value={this._currentyear-2}>{this._currentyear-2}</option>
                    </select>
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
