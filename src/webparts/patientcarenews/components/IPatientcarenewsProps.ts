import IPatientCareNewsDataProvider from "../dataprovider/IPatientCareNewsDataProvider";
export interface IPatientcarenewsProps {
  description: string;
  searchQuery:string;
  dataprovider:IPatientCareNewsDataProvider;
}
