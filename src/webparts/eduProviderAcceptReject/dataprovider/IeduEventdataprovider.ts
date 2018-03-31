import {IWebPartContext} from "@microsoft/sp-webpart-base";

export interface IeduEventdataprovider{
     listname:string;
     itemID:number;
     getClassScheduleItem():Promise<any>;
     acceptClassScheduleItem(currentUserId:number):Promise<any>;
     rejectClassScheduleItem(currentUserId:number):Promise<any>;
     getCurrentUserId():Promise<any>;
}