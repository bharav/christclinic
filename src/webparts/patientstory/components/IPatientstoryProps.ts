import IPatientStoryDataProvider from "../dataprovider/IPatientStoryDataProvider";
export interface IPatientstoryProps {
  description: string;
  searchQuery:string;
  dataprovider:IPatientStoryDataProvider;
}
