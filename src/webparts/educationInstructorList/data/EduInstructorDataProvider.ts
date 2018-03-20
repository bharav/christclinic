import IEduInstructorDataProvider from "./IEduInstructorDataProvider";
import {IWebPartContext} from "@microsoft/sp-webpart-base";
import axios from "axios";

class EduInstructorDataProvider implements IEduInstructorDataProvider{

    private _pageContext: IWebPartContext;
    private _instructorlistData: any[];
    private _countPerPage: number;
    private _listName:string;
    public set pageContext(value: IWebPartContext) { this._pageContext = value; }
    public get pageContext(): IWebPartContext { return this._pageContext; }
    public set instructorData(value: any[]) { this._instructorlistData = value; }
    public get instructorData(): any[] { return this._instructorlistData; }
    public set countPerPage(value: number) { this._countPerPage = value; }
    public get countPerPage(): number { return this._countPerPage; }
    public set listName(value: string) { this._listName = value; }
    public get listName(): string { return this._listName; }
    public constructor(webPartContext: IWebPartContext, listName:string) {
        this.pageContext = webPartContext;
        this.listName = listName;
    }
    public getdataforInstructorList(pagenumber:number):Promise<any>{
        if(localStorage["instructorlist"]!==undefined)
        {
            return new Promise<any>((resolve) => {
               return resolve(JSON.parse(localStorage.getItem("instructorlist")));
            });
        }
    else
    {
        let listQueryUrl = this.pageContext.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('"+this.listName+"')/items";
        return axios.get(listQueryUrl).then((result:any)=> {
            this.instructorData = result.data;
            localStorage.setItem("instructorlist",JSON.stringify(result.data));
            return this.instructorData;
        });
    }
    }
}

export default EduInstructorDataProvider;