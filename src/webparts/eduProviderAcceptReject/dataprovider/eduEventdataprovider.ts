import {IeduEventdataprovider} from "./IeduEventdataprovider";
import {IWebPartContext} from "@microsoft/sp-webpart-base";
import axios from "axios";
import pnp from "sp-pnp-js";
import { times } from "@microsoft/sp-lodash-subset";

export class eduEventdataprovider implements IeduEventdataprovider{

    private _webpartContext:IWebPartContext;
    private _listname:string;
    private _itemID:number;
    private _apiUrl:string;
    private _userApiUrl:string;
    public set listname(value: string) { this._listname = value; }
    public get listname(): string { return this._listname; }
    public set itemID(value: number) { this._itemID = value; }
    public get itemID(): number { return this._itemID; }
    public get apiUrl():string { return this._apiUrl;}
    public set apiUrl(value:string){this._apiUrl = value;}


    public constructor(webPartContext: IWebPartContext, listName:string, itemID:number) {
        this._webpartContext = webPartContext;
        this.listname = listName;
        this.itemID = itemID;
        this.apiUrl = webPartContext.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('"+this.listname+"')/GetItemById("+this.itemID+")";
        this._userApiUrl=webPartContext.pageContext.web.absoluteUrl +"/_api/web/siteusers(@v)?@v='"+encodeURIComponent("i:0#.f|membership|"+webPartContext.pageContext.user.loginName)+"'";
        pnp.setup({
            spfxContext:webPartContext
        });
    }
    public getClassScheduleItem():Promise<any>{
        return axios.get(this.apiUrl).then((response:any)=>{
            return response.data;
        })
        .catch(error=>{
            return null;
        });
    } 
    public getCurrentUserId():Promise<any>{
        return axios.get(this._userApiUrl).then((response:any)=>{
            return response.data;
        });
    }    
    public rejectClassScheduleItem(currentUserId:number):Promise<any>{
        let list = pnp.sp.web.lists.getByTitle(this.listname);
        return list.items.getById(this.itemID).update({
            Accept:'Reject'
        }).then(response=>{
            return response;
        });
    }
    public acceptClassScheduleItem(currentUserId:number):Promise<any>{
        let list = pnp.sp.web.lists.getByTitle(this.listname);
        return list.items.getById(this.itemID).update({
            Accept:'Accept'
        }).then(response=>{
            return response;
        });
    }
}



