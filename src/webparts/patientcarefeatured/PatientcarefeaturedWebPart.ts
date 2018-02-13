import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "PatientcarefeaturedWebPartStrings";
import Patientcarefeatured from "./components/Patientcarefeatured";
import { IPatientcarefeaturedProps } from "./components/IPatientcarefeaturedProps";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import FeaturedDataProvider from "./dataprovider/FeaturedDataProvider";

export interface IPatientcarefeaturedWebPartProps {
  description: string;
  searchQuery:string;
}

export default class PatientcarefeaturedWebPart extends BaseClientSideWebPart<IPatientcarefeaturedWebPartProps> {

  private _dataProvider: any;
  protected onInit(): Promise<void> {
    if (Environment.type !== EnvironmentType.Local) {
      this._dataProvider = new FeaturedDataProvider(this.context);
    }
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IPatientcarefeaturedProps > = React.createElement(
      Patientcarefeatured,
      {
        description: this.properties.description,
        searchQuery:this.properties.searchQuery,
        dataprovider:this._dataProvider
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
