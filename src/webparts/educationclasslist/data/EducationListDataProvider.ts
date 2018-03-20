    import IEducationListDataProvider from "./IEducationListDataProvider";
    import {IWebPartContext} from "@microsoft/sp-webpart-base";
    import axios from "axios";

    class EducationListDataProvider implements IEducationListDataProvider{

        private _pageContext: IWebPartContext;
        private _educationlistData: any[];
        private _countPerPage: number;
        private _listName:string;
        public set pageContext(value: IWebPartContext) { this._pageContext = value; }
        public get pageContext(): IWebPartContext { return this._pageContext; }
        public set educationlistData(value: any[]) { this._educationlistData = value; }
        public get educationlistData(): any[] { return this._educationlistData; }
        public set countPerPage(value: number) { this._countPerPage = value; }
        public get countPerPage(): number { return this._countPerPage; }
        public set listName(value: string) { this._listName = value; }
        public get listName(): string { return this._listName; }
        public constructor(webPartContext: IWebPartContext, listName:string) {
            this.pageContext = webPartContext;
            this.listName = listName;
        }
        public getdataforEducationList(classType:string, pagenumber:number):Promise<any>{
            if(localStorage["educationclasslist"]!==undefined && localStorage["classtype"]===classType)
            {
                return new Promise<any>((resolve) => {
                   return resolve(JSON.parse(localStorage.getItem("educationclasslist")));
                });
            }
        else
        {
            let listQueryUrl = this.pageContext.pageContext.web.absoluteUrl +"/_api/web/lists/getbytitle('"+this.listName+"')/items?$filter=ClassType eq '"+classType+"'";
            return axios.get(listQueryUrl).then((result:any)=> {
                this.educationlistData = result.data;
                localStorage.setItem("educationclasslist",JSON.stringify(result.data));
                localStorage.setItem("classtype",classType);
                return this.educationlistData;
            });
        }
        }
    }

    export default EducationListDataProvider;