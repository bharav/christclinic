interface IPatientCareNewsDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    searchQueryText:string;
    selectedProperties: string;
    Data: any[];
    Count:number;
    /**
     * Performs a SharePoint search query
     */
    getdataforNews():Promise<any[]>;
}
 export default IPatientCareNewsDataProvider;