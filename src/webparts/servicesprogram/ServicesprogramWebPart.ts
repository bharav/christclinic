import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "ServicesprogramWebPartStrings";
import Servicesprogram from "./components/Servicesprogram";
import { IServicesprogramProps } from "./components/IServicesprogramProps";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import ServicesDataProvider from "./dataprovider/ServicesDataProvider";

export interface IServicesprogramWebPartProps {
  description: string;
  searchQuery:string;
}

export default class ServicesprogramWebPart extends BaseClientSideWebPart<IServicesprogramWebPartProps> {
  private _dataProvider: any;
  protected onInit(): Promise<void> {
    if (Environment.type !== EnvironmentType.Local) {
      this._dataProvider = new ServicesDataProvider(this.context);
    }
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IServicesprogramProps > = React.createElement(
      Servicesprogram,
      {
        description: this.properties.description,
        dataprovider:this._dataProvider,
        searchQuery:this.properties.searchQuery

      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField("searchQuery", {
                  label: strings.SearchQueryFieldName
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
