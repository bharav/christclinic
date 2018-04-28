import * as React from 'react';
import styles from './CaVoting.module.scss';
import { ICaVotingProps } from './ICaVotingProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {IVotingDataProvider} from "../data/IVotingDataProvider";
import {VotingDataProvider} from "../data/VotingDataProvider";
import {Spinner} from "office-ui-fabric-react";
import * as moment  from "moment";
import {Doughnut,Pie} from "react-chartjs-2";

export interface ICaVotingState{
  showspinner:boolean;
  showoptions:boolean;
  showgraph:boolean;
  showmessage:boolean;
  message:string;
  options:string[];
  optionsId:number[];
  optionchoosen:number;
  pollquestion:string;
  graphdata:any;
  currentuserid:number;
  optionsdata:any[];
}

export default class CaVoting extends React.Component<ICaVotingProps, ICaVotingState> {
  private dataprovider:IVotingDataProvider;
  
  constructor(props) {
    super(props);
    this.choosevotingitem = this.choosevotingitem.bind(this);
    this.castvote = this.castvote.bind(this);
    this.state = {
      showspinner:true,
      showoptions:false,
      showgraph:false,
      showmessage:false,
      message:"",
      options:[],
      optionsId:[],
      optionchoosen:-1,
      pollquestion:"",
      graphdata:null,
      currentuserid:-1,
      optionsdata:[]
    };
    this.dataprovider = new VotingDataProvider(this.props.webpartcontext,this.props.configListName,this.props.optionsListName);
  }

  public componentDidMount():void{
    debugger;
    this.dataprovider.getVotingConfig().then(data=>{
      console.log(data);
      if(data!==null){
        if(data[0]["LastPollCrawl"]!=null){
          let lastCrawlDate = moment(data[0]["LastPollCrawl"]);
          let checkPollOpen = moment().add(data[0]["VotingDurationInDays"],'days');
          if(checkPollOpen>=lastCrawlDate)
          {

            this.dataprovider.getVotingOptions().then(items=>{
              this.dataprovider.getCurrentUserId().then(user=>{
                let alreadyVoted:boolean = false;
                let votingOption:string[]=[];
                let votingOptionId:number[]=[];
                items.map(item=>{
                  votingOption.push(item["Title"]);
                  votingOptionId.push(item["Id"]);
                  if(item.PeopleVotedId!=null){
                    item.PeopleVotedId.map((votedby,key)=>{
                      if(user.data.Id===votedby){
                        alreadyVoted=true;
                      }
                  });
                };
              });
              if(alreadyVoted){
                let mapdata:any;
                let _label:any[]=[];
                let _data:any[]=[];
                let _bkcolor:string[]=[];
                items.map((item,index)=>{
                  _label.push(item.Title);
                  _data.push(item.PeopleVotedId===null?0:item.PeopleVotedId);
                  _bkcolor.push(this.getRandomColor());
                });
                mapdata = {
                  labels:_label,
                  legend: {
                      position: 'bottom'
                    },
                  datasets: [{
                      data: _data,
                      backgroundColor:_bkcolor
                  }]
              };
              this.setState({
                showspinner:false,
                showgraph:true,
                graphdata:mapdata,
                showoptions:false
              });
              }
              else{
                this.setState({
                  showspinner:false,
                  showgraph:false,//need to be changed on graph implimentation
                  showoptions:true,
                  showmessage:false,
                  message:"",
                  options:votingOption,
                  optionsId:votingOptionId,
                  pollquestion:data[0]["PollQuestionText"],
                  currentuserid:user.data.Id,
                  optionsdata:items
                });
              }
            });
          });
          }
        }
      }

    })
  }

  private choosevotingitem=(e: React.FormEvent<HTMLInputElement>):void=>{
   this.setState({
    optionchoosen:parseInt(e.currentTarget.value)
   });
  }

  private castvote=(()=>{
    this.setState({
      showspinner:true
    });
    this.dataprovider.castYourVote(this.state.currentuserid,this.state.optionchoosen).then(data=>{
      let mapdata:any;
      let _label:any[]=[];
      let _data:any[]=[];
      let _bkcolor:string[]=[];
      this.state.optionsdata.map((item,index)=>{
        _label.push(item.Title);
        _data.push(item.Id===this.state.optionchoosen?item.PeopleVotedId===null?1:item.PeopleVotedId.count+1:item.PeopleVotedId===null?0:item.PeopleVotedId);
        _bkcolor.push(this.getRandomColor());
      });
      mapdata = {
        labels:_label,
        legend: {
            position: 'bottom'
          },
        datasets: [{
            data: _data,
            backgroundColor:_bkcolor
        }]
    };
    this.setState({
      showspinner:false,
      showgraph:true,
      graphdata:mapdata,
      showoptions:false
    });

    });
  });

  private getRandomColor() {
    let letters:string = '0123456789ABCDEF';
    let color:string = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  public render(): React.ReactElement<ICaVotingProps> {
    return (
      <div className={ styles.caVoting }>
        {this.state.showspinner?<Spinner/>:
        this.state.showmessage ? <p>this.state.message</p>:
        this.state.showoptions?<div className="voting_div"><h4>{this.state.pollquestion}</h4>{this.state.optionsId.map((option,index)=>{
          return(<p><input type="radio" name={this.state.options[index]} 
          value={option} checked={this.state.optionchoosen===option} onChange={e=>this.choosevotingitem(e)}/>{this.state.options[index]}</p>)
        })}<br/><button onClick={this.castvote}>Vote</button></div>:
        this.state.showgraph?<Pie data={this.state.graphdata} />:<p>Unexpected Error Occured</p>}
      </div>
    );
  }
}
