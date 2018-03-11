import * as React from 'react';
import styles from './Fundingpiechart.module.scss';
import { IFundingpiechartProps } from './IFundingpiechartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Doughnut} from "react-chartjs-2";
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
    }
  }
  public componentDidMount():void{
          fundingdata.getdata().then(data=>{
            this.setState({
              fundingdata:data
            })
          })
  }
  public render(): React.ReactElement<IFundingpiechartProps> {
    return (
      <div className={ styles.fundingpiechart }>
        <div className={ styles.container }>
        <Doughnut data={this.state.fundingdata} />
        </div>
      </div>
    );
  }
}
