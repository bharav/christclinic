import * as React from 'react';
import styles from './SpecialistRequestChart.module.scss';
import { ISpecialistRequestChartProps } from './ISpecialistRequestChartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Doughnut,Pie} from "react-chartjs-2";
import SpecialistRequestData from "../data/SpecialistRequestData";
import ISpecialistRequestData from "../data/ISpecialistRequestData";
export interface ISpecialistRequestChartState {
  title:string;
  specialitydata: any;
  error:string;
  showgraph:boolean;
}

export default class SpecialistRequestChart extends React.Component<ISpecialistRequestChartProps, ISpecialistRequestChartState> {
  private _dataProvider: ISpecialistRequestData;
  constructor(props: ISpecialistRequestChartProps) {
    super(props);
    this.state = {
      title:"",
      specialitydata: null,
      error:"loading...",
      showgraph:false
    };
   
  }

  /*/*Sending the web part properties (top news API text,regional news API text,
    Count, View more link) to display the top news & regional news content to the page*/
    public componentDidMount(): void {
      debugger;
      if(this.props.listName !== ''){
        this._dataProvider = new SpecialistRequestData(this.props.context,this.props.listName);
        let currentDate:Date = new Date();
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        this._dataProvider.getdata(firstDay,lastDay).then((data:any) => {
          this.setState({
            specialitydata : data,
            title:"Speciality for the month of " + currentDate.toLocaleString("en", { month: "long" }) ,
            showgraph:true
          });
        });
      }
      else{
        this.setState({
          error:"Please set the list title",
          showgraph:false
        });
      }
    }

    public componentWillReceiveProps(newProps){
      if(newProps.listName !== ''){
        this._dataProvider = new SpecialistRequestData(newProps.context,newProps.listName);
        let currentDate:Date = new Date();
        let firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        let lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        this._dataProvider.getdata(firstDay,lastDay).then((data:any) => {
          this.setState({
            specialitydata : data,
            title:"Speciality for the month of " + currentDate.toLocaleString("en", { month: "long" }),
            showgraph:true
          });
        });
      }
      else{
        this.setState({
          error:"Please set the list title",
          showgraph:false
        });
      }
    }

  public render(): React.ReactElement<ISpecialistRequestChartProps> {
    return (
     <div>
       {this.state.showgraph?<div>
         <p>{this.state.title}</p>
         <Pie data={this.state.specialitydata} />
       </div>:<div><p>{this.state.error}</p></div>}
     </div>
    );
  }
}
