import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "PatientstoryWebPartStrings";
import Patientstory from "./components/Patientstory";
import { IPatientstoryProps } from "./components/IPatientstoryProps";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import PatientStoryDataProvider from "./dataprovider/PatientStoryDataProvider";

export interface IPatientstoryWebPartProps {
  description: string;
  searchQuery:string;
}

export default class PatientstoryWebPart extends BaseClientSideWebPart<IPatientstoryWebPartProps> {
  private _dataProvider: any;
  protected onInit(): Promise<void> {
    if (Environment.type !== EnvironmentType.Local) {
      this._dataProvider = new PatientStoryDataProvider(this.context);
    }
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IPatientstoryProps > = React.createElement(
      Patientstory,
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
