import IServicesDataProvider from "../dataprovider/IServicesDataProvider";
export interface IServicesprogramProps {
  description: string;
  searchQuery:string;
  dataprovider:IServicesDataProvider;
}
