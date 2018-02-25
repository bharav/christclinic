interface ICCImageGalleryDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    searchQueryText:string;
    selectedProperties: string;
    Data: any[];
    /**
     * Performs a SharePoint search query
     */
    getdataforImageGallery():Promise<any>;
}
 export default ICCImageGalleryDataProvider;