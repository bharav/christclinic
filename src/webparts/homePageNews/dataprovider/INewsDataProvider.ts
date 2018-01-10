interface INewsDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    newSearchQueryText:string;
    selectedProperties: string;
    carousalData: any[];
    newsCount:number;
    /**
     * Performs a SharePoint search query
     */
    getdataforCarousal():Promise<any[]>;
}
 export default INewsDataProvider;