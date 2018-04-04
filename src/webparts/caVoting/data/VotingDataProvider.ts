import {IVotingDataProvider} from "./IVotingDataProvider";
import {IWebPartContext} from "@microsoft/sp-webpart-base";
import axios from "axios";
import pnp from "sp-pnp-js";
import { times } from "@microsoft/sp-lodash-subset";

export class VotingDataProvider implements IVotingDataProvider{

    private _webpartContext:IWebPartContext;
    private _configlistname:string;
    private _optionslistname:string;
    private _configApiUrl:string;
    private _optionsApriUrl:string;
    private _userApiUrl:string;
    public set configListName(value: string) { this._configlistname = value; }
    public get configListName(): string { return this._configlistname; }
    public set optionsListName(value: string) { this._optionslistname = value; }
    public get optionsListName(): string { return this._optionslistname; }


    public constructor(webPartContext: IWebPartContext, ConfiglistName:string, OptionlistName:string) {
        this._webpartContext = webPartContext;
        this.configListName = ConfiglistName;
        this.optionsListName = OptionlistName;
        this._optionsApriUrl = webPartContext.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('"+this.optionsListName+"')";
        this._configApiUrl= webPartContext.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('"+this.configListName+"')";
        this._userApiUrl=webPartContext.pageContext.web.absoluteUrl +"/_api/web/siteusers(@v)?@v='"+encodeURIComponent("i:0#.f|membership|"+webPartContext.pageContext.user.loginName)+"'";
        pnp.setup({
            spfxContext:webPartContext
        });
    }
    public getVotingConfig():Promise<any>{
        let _configList = pnp.sp.web.lists.getByTitle(this.configListName);
        return _configList.items.getAll().then(response=>{
            return response
        }).catch(error=>{
            console.log(error);
            return null
        })
    } 
    public getVotingOptions():Promise<any>{
        let _optionsList = pnp.sp.web.lists.getByTitle(this.optionsListName);
        return _optionsList.items.getAll().then(response=>{
            return response
        }).catch(error=>{
            console.log(error);
            return null
        })
    } 
    public getCurrentUserId():Promise<any>{
        return pnp.sp.web.ensureUser("i:0#.f|membership|"+this._webpartContext.pageContext.user.loginName).then(
            response=>{
                return response;
            }
        ).catch(error=>{
            pnp.sp.web.ensureUser("i:0#.f|membership|"+this._webpartContext.pageContext.user.loginName).then(
                response=>{
                    return response;
                }
            );
        });
    }    
    public castYourVote(currentUserId:number,itemId:number):Promise<any>{
        let list = pnp.sp.web.lists.getByTitle(this.optionsListName);
        return list.items.getById(itemId).update({
            PeopleVotedId:{
                results: [currentUserId]
            }
        }).then(response=>{
            return response;
        });
    }
}



