import IFeaturedDataProvider from "../dataprovider/IFeaturedDataProvider";
export interface IPatientcarefeaturedProps {
  description: string;
  searchQuery:string;
  dataprovider:IFeaturedDataProvider;
}
