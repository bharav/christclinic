import * as React from 'react';
import styles from './AcceptOrRejectEvent.module.scss';
import { IAcceptOrRejectEventProps } from './IAcceptOrRejectEventProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {Ieventdataprovider} from "../dataprovider/Ieventdataprovider";
import {eventdataprovider} from "../dataprovider/eventdataprovider";
export interface IAcceptOrRejectEventData{
showAcceptReject:boolean;
itemId:number;
currentUserId:number;
item:any;
isMandatory:boolean;
}
export default class AcceptOrRejectEvent extends React.Component<IAcceptOrRejectEventProps, IAcceptOrRejectEventData> {
  private dataprovider:Ieventdataprovider;
  constructor(props) {
    super(props);
    this.acceptevent = this.acceptevent.bind(this);
    this.rejectevent = this.rejectevent.bind(this);
    this.state = {
      showAcceptReject:true,
      itemId:0,
      currentUserId:-1,
      item:null,
      isMandatory:false
    };
    let itemID:number= parseInt(this.getquerystring(window.location.href));
    this.dataprovider = new eventdataprovider(this.props.webpartcontext,this.props.listname,itemID);
  }
  private acceptevent = ()=>{
    this.dataprovider.acceptEventItem(this.state.currentUserId).then((data:any)=>{
      window.location.href = this.props.webpartcontext.pageContext.web.absoluteUrl;
    });

  }
  private rejectevent=()=>{
    this.dataprovider.rejectEventItem(this.state.currentUserId).then((data:any)=>{
      if(data.Item!==null){
        this.setState({
          showAcceptReject:false
        });
      }
      window.location.href = this.props.webpartcontext.pageContext.web.absoluteUrl;
    });
  }
  public componentDidMount():void{
    this.dataprovider.getEventItem().then((item:any)=>{
      this.dataprovider.getCurrentUserId().then((user:any)=>{
        if(item.Mandatory===true){
          this.setState({
            isMandatory:true
          });
        }
        else{
              if(item.ParticipantsPickerId!==null){
                item.ParticipantsPickerId.map((attendee,key)=>{
                  if(user.Id===attendee){
                    this.setState({
                      showAcceptReject:false,
                      itemId:item.Id
                    });
                  }
                });
              }
              else if(item.RejectedAttendeesId!==null){
                item.RejectedAttendeesId.map((rejectedAttendee,key)=>{
                  if(user.Id===rejectedAttendee){
                    this.setState({
                      showAcceptReject:false,
                      itemId:item.Id
                      });
                  }
                });
              }
       
        }       
        if(this.state.showAcceptReject===true && item!==null){
          this.setState({
            item:item,
            currentUserId:user.Id,
            itemId:item.Id
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
  public render(): React.ReactElement<IAcceptOrRejectEventProps> {
    return (
      <div className={ styles.acceptOrRejectEvent }>
        <div className={ styles.container }>
        {
          this.state.itemId===0?<p>Please browse from currect url</p>:
          this.state.isMandatory===true?<p>This is mandatory for all. No need of acceptance</p>:
            this.state.showAcceptReject===false?<p>Already accepted or rejected event</p>:<div>
                <button onClick={this.acceptevent}>Accept</button>
                <button onClick={this.rejectevent}>Reject</button>
            </div> 
        }
        </div>
      </div>
    );
  }
}
