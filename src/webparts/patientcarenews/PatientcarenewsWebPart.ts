import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "PatientcarenewsWebPartStrings";
import Patientcarenews from "./components/Patientcarenews";
import { IPatientcarenewsProps } from "./components/IPatientcarenewsProps";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import PatientCareNewsDataProvider from "./dataprovider/PatientCareNewsDataProvider";


export interface IPatientcarenewsWebPartProps {
  description: string;
  searchQuery:string;
}

export default class PatientcarenewsWebPart extends BaseClientSideWebPart<IPatientcarenewsWebPartProps> {
  private _dataProvider: any;
  protected onInit(): Promise<void> {
    if (Environment.type !== EnvironmentType.Local) {
      this._dataProvider = new PatientCareNewsDataProvider(this.context);
    }
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IPatientcarenewsProps > = React.createElement(
      Patientcarenews,
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
