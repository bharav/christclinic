import * as React from 'react';
import styles from './EduProviderAcceptReject.module.scss';
import { IEduProviderAcceptRejectProps } from './IEduProviderAcceptRejectProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {IeduEventdataprovider} from "../dataprovider/IEduEventdataprovider";
import {eduEventdataprovider} from "../dataprovider/EduEventdataprovider";
export interface IEduProviderAcceptRejectState{
 showAcceptReject:boolean;
 itemId:number;
 currentUserId:number;
 item:any;
}

export default class EduProviderAcceptReject extends React.Component<IEduProviderAcceptRejectProps, IEduProviderAcceptRejectState> {
  private dataprovider:IeduEventdataprovider;
  constructor(props) {
    super(props);
    this.acceptevent = this.acceptevent.bind(this);
    this.rejectevent = this.rejectevent.bind(this);
    this.state = {
      showAcceptReject:true,
      itemId:0,
      currentUserId:-1,
      item:null
    };
    let itemID:number= parseInt(this.getquerystring(window.location.href));
    this.dataprovider = new eduEventdataprovider(this.props.webpartcontext,this.props.listname,itemID);
  }
  private acceptevent = ()=>{
    this.dataprovider.acceptClassScheduleItem(this.state.currentUserId).then((data:any)=>{
      window.location.href = this.props.webpartcontext.pageContext.web.absoluteUrl;
    });

  }
  private rejectevent=()=>{
    this.dataprovider.rejectClassScheduleItem(this.state.currentUserId).then((data:any)=>{
      if(data.Item!==null){
        this.setState({
          showAcceptReject:false
        });
      }
      window.location.href = this.props.webpartcontext.pageContext.web.absoluteUrl;
    });
  }
  public componentDidMount():void{
    debugger;
    this.dataprovider.getClassScheduleItem().then((item:any)=>{
      this.dataprovider.getCurrentUserId().then((user:any)=>{
        if(item !==null){
          if(item.Accept!==null){
                this.setState({
                  showAcceptReject:false,
                  itemId:item.Id
                });
          }
          else{
            this.setState({
              item:item,
              currentUserId:user.Id,
              itemId:item.Id
            });
          }
        }
        else {
          this.setState({
            itemId:0
          });
        }   
      });
    });
  }
  private getquerystring(url:string):string{
    let querypart = url.indexOf('?')>1?url.split('?')[1]:"";
    if(querypart.indexOf('&')>1){
      let querystring:string[]=querypart.split('&');
      return querystring[0].split('=')[1];
    }
    else
    {
      return querypart.split('=')[1];
    }
  }
  public render(): React.ReactElement<IEduProviderAcceptRejectProps> {
    return (
      <div className={ styles.eduProviderAcceptReject }>
        <div className={ styles.container }>
        {
          this.state.itemId===0?<p>Please browse from currect url</p>:
            this.state.showAcceptReject===false?<p>Already accepted or rejected event</p>:<div>
                <p></p>
                <button onClick={this.acceptevent}>Accept</button>
                <button onClick={this.rejectevent}>Reject</button>
            </div> 
        }
        </div>
      </div>
    );
  }
}
