import {IWebPartContext} from "@microsoft/sp-webpart-base";

interface IEduInstructorDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    pageContext:IWebPartContext;
    instructorData: any[];
    countPerPage:number;
    /**
     * Performs a SharePoint search query
     */
    getdataforInstructorList(pagenumber:number):Promise<any>;
}
 export default IEduInstructorDataProvider;