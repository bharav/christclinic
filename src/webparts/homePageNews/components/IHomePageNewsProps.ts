import INewsDataProvider from "../dataprovider/INewsDataProvider";

export interface IHomePageNewsProps {
  newssearchquery:string;
  dataprovider:INewsDataProvider;
  newscount:number;
  layout:string;
}
