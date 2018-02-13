import * as React from "react";
import styles from "./Patientcarenews.module.scss";
import { IPatientcarenewsProps } from "./IPatientcarenewsProps";
import { escape } from "@microsoft/sp-lodash-subset";
import IPatientCareNewsDataProvider from "../dataprovider/IPatientCareNewsDataProvider";

export interface IPatientcarenewsState{
  data:any[];
}
export default class Patientcarenews extends React.Component<IPatientcarenewsProps, IPatientcarenewsState> {
  private _dataProvider: IPatientCareNewsDataProvider;
  constructor(props: IPatientcarenewsProps) {
    super(props);
    this.state = {
      data: []
    };
  }

  /*/*Sending the web part properties (top news API text,regional news API text,
    Count, View more link) to display the top news & regional news content to the page*/
    public componentDidMount(): void {
      this.props.dataprovider.selectedProperties = `title,path,PageDescriptionOWSHTML`;
      this.props.dataprovider.searchQueryText = this.props.searchQuery;
      this.props.dataprovider.Count = 3;
      this.props.dataprovider.getdataforNews().then((data:any[]) => {
        this.setState({
          data: data
        });
      });
    }
  public render(): React.ReactElement<IPatientcarenewsProps> {
    return (
      <div className="patientcarenews">
       {this.state.data.map((news,index)=> {
          return(<div className="newslistitem">
            <a href={news.path}>{news.title}</a>
          </div>);
        })
      }
      </div>
    );
  }
}
