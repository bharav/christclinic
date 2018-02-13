interface IFeaturedDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    featuredQueryText:string;
    selectedProperties: string;
    featuredData: any[];
    Count:number;
    /**
     * Performs a SharePoint search query
     */
    getdataforFeatured():Promise<any[]>;
}
 export default IFeaturedDataProvider;