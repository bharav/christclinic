import * as React from "react";
import styles from "./Patientstory.module.scss";
import { IPatientstoryProps } from "./IPatientstoryProps";
import { escape } from "@microsoft/sp-lodash-subset";
import IPatientStoryDataProvider from "../dataprovider/IPatientStoryDataProvider";

export interface IPatientstoryState{
  data:any;
}

export default class Patientstory extends React.Component<IPatientstoryProps, IPatientstoryState> {
  private _dataProvider: IPatientStoryDataProvider;
  constructor(props: IPatientstoryProps) {
    super(props);
    this.state = {
      data: {}
    };
  }

  /*/*Sending the web part properties (top news API text,regional news API text,
    Count, View more link) to display the top news & regional news content to the page*/
    public componentDidMount(): void {
      this.props.dataprovider.selectedProperties = `Title,PublishingPageImageOWSIMGEX,LastModifiedTime,ListItem,Path`;
      this.props.dataprovider.searchQueryText = this.props.searchQuery;
      this.props.dataprovider.getdataforPatientStory().then((data:any) => {
        this.setState({
          data: data
        });
      });
    }
  public render(): React.ReactElement<IPatientstoryProps> {
    const patientstory:JSX.Element = Object.keys(this.state.data).length===0?<div>No records</div>:
    <div><img src={this.state.data.original}/>
    <a href={this.state.data.path}>{this.state.data.description}</a></div>;
    return (
      <div className={ styles.patientstory }>
     {patientstory}
      </div>
    );
  }
}
