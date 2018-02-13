interface IServicesDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    searchQueryText:string;
    selectedProperties: string;
    serviceData: any[];
    perpageCount:number;
    /**
     * Performs a SharePoint search query
     */
    getdataforServices():Promise<any[]>;
}
 export default IServicesDataProvider;