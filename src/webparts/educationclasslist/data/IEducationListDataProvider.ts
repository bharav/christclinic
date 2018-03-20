import {IWebPartContext} from "@microsoft/sp-webpart-base";

interface IEducationListDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    pageContext:IWebPartContext
    educationlistData: any[];
    countPerPage:number;
    /**
     * Performs a SharePoint search query
     */
    getdataforEducationList(classType:string,pagenumber:number):Promise<any>;
}
 export default IEducationListDataProvider;