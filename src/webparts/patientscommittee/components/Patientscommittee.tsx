import * as React from 'react';
import styles from './Patientscommittee.module.scss';
import { IPatientscommitteeProps } from './IPatientscommitteeProps';
import { escape } from '@microsoft/sp-lodash-subset';
import IPatientCommitteeDataProvider from '../data/IPatientCommitteeDataProvider';
import PatientCommitteeDataProvider from '../data/PatientCommitteeDataProvider';
export interface IPatientscommitteeState{
  data:any;
}

export default class Patientscommittee extends React.Component<IPatientscommitteeProps, IPatientscommitteeState> {
  private _dataProvider: IPatientCommitteeDataProvider;
  constructor(props: IPatientscommitteeProps) {
    super(props);
    this.state = {
      data: null
    };
   
  }

  /*/*Sending the web part properties (top news API text,regional news API text,
    Count, View more link) to display the top news & regional news content to the page*/
    public componentDidMount(): void {
      debugger;
      if(this.props.listName !== ''){
        this._dataProvider = new PatientCommitteeDataProvider(this.props.webPartContext,this.props.listName);
        this._dataProvider.getdata().then((data:any) => {
          this.setState({
            data: data
          });
        });
      }
    }
    public componentWillReceiveProps(newProps){
      if(newProps.listName !== ''){
        this._dataProvider = new PatientCommitteeDataProvider(newProps.webPartContext,newProps.listName);
        this._dataProvider.getdata().then((data:any) => {
          this.setState({
            data: data
          });
        });
      }
    }
  public render(): React.ReactElement<IPatientscommitteeProps> {
    return (
     <div>
       {this.state.data!==null?<div>
         {this.state.data.map((item,key)=>{
           return (
           <div className='member-pics col-xs-6'>
            <img src={item.Image.Url}/>
            <strong>{item.Title}</strong>
            <p>{item.Biography}</p>
           </div>);
         })}
       </div>:<div><p>Please provide advisory committee list name</p></div>}
     </div>
    );
  }
}
