import * as React from "react";
import styles from "./Servicesprogram.module.scss";
import { IServicesprogramProps } from "./IServicesprogramProps";
import { escape } from "@microsoft/sp-lodash-subset";
import IServicesDataProvider from "../dataprovider/IServicesDataProvider";

export interface IServicesprogramState{
  data:any[];
}

export default class Servicesprogram extends React.Component<IServicesprogramProps, IServicesprogramState> {
  private _dataProvider: IServicesDataProvider;
  constructor(props: IServicesprogramProps) {
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
      this.props.dataprovider.perpageCount = 3;
      this.props.dataprovider.getdataforServices().then((data:any[]) => {
        this.setState({
          data: data
        });
      });
    }
  public render(): React.ReactElement<IServicesprogramProps> {
    return (
      <div className={ styles.servicesprogram }>
       {this.state.data.map((service,index)=> {
          return(<div>
            <label>{service.title}</label>
            <p>{service.description}</p>
          </div>);
        })
      }
      </div>
    );
  }
}
