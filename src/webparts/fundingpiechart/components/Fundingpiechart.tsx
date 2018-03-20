import * as React from 'react';
import styles from './Fundingpiechart.module.scss';
import { IFundingpiechartProps } from './IFundingpiechartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Doughnut,Pie} from "react-chartjs-2";
import fundingdata from "../data/fundingdata";

export interface IFundingpiechartState {
  title:string;
  fundingdata: any;
}
export default class Fundingpiechart extends React.Component<IFundingpiechartProps, IFundingpiechartState> {
  constructor(props) {
    super(props);
    this.state={
      fundingdata:{},
      title:"test"
    };
  }
  public componentDidMount():void{
          fundingdata.getdata("2018").then(data=>{
            this.setState({
              fundingdata:data
            });
          });
  }
  public render(): React.ReactElement<IFundingpiechartProps> {
    const options:any={
      legend: {
      position: 'right'
    },
    title: {
      display: true,
      fontSize:24,
      text: 'Funding for the Year 2018'
    }
  };
    return (
      <div className={ styles.fundingpiechart }>
        <div className={ styles.container }>
        <Pie data={this.state.fundingdata} options={options}/>
        </div>
      </div>
    );
  }
}
