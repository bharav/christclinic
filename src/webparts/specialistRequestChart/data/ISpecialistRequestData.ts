interface ISpecialistRequestData {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    listName:string;
    /**
     * Performs a SharePoint search query
     */
    getdata(startDate:Date, endDate:Date):Promise<any>;
}
 export default ISpecialistRequestData;