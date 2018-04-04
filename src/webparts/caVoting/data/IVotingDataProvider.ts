import {IWebPartContext} from "@microsoft/sp-webpart-base";

export interface IVotingDataProvider{
    configListName:string;
    optionsListName:string;
    getVotingConfig():Promise<any> 
    getVotingOptions():Promise<any>;
    castYourVote(currentUserId:number,itemId:number):Promise<any>;
    getCurrentUserId():Promise<any>;
}