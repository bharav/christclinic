import {IWebPartContext} from "@microsoft/sp-webpart-base";

export interface Ieventdataprovider{
    listname:string;
    itemID:number;
     getEventItem():Promise<any>;
     acceptEventItem(currentUserId:number):Promise<any>;
     rejectEventItem(currentUserId:number):Promise<any>;
     getCurrentUserId():Promise<any>;
}