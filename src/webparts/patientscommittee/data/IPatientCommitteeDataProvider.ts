interface IPatientCommitteeDataProvider {
    /**
     * Determines the number of items ot retrieve in search REST requests
     */
    listName:string;
    /**
     * Performs a SharePoint search query
     */
    getdata():Promise<any>;
}
 export default IPatientCommitteeDataProvider;