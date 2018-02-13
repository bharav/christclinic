import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from "@microsoft/sp-webpart-base";

import * as strings from "homePageNewsStrings";
import HomePageNews from "./components/HomePageNews";
import { IHomePageNewsProps } from "./components/IHomePageNewsProps";
import { IHomePageNewsWebPartProps } from "./IHomePageNewsWebPartProps";
import NewsDataProvider from "./dataprovider/NewsDataProvider";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

export default class HomePageNewsWebPart extends BaseClientSideWebPart<IHomePageNewsWebPartProps> {

  private _dataProvider: any;
  protected onInit(): Promise<void> {
    if (Environment.type !== EnvironmentType.Local) {
      this._dataProvider = new NewsDataProvider(this.context);
    }
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IHomePageNewsProps > = React.createElement(
      HomePageNews,
      {
        newssearchquery:this.properties.searchquery,
        dataprovider:this._dataProvider,
        newscount:this.properties.newscount,
        layout:this.properties.layout
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
                PropertyPaneTextField("searchquery", {
                  label: strings.SearchQueryTextFieldLabel
                }),
                PropertyPaneTextField("newscount", {
                  label: strings.NewsCountFieldLabel
                }),
                ,
                PropertyPaneDropdown("layout", {
                  label: strings.LayoutFieldName,
                  options: [{ key: strings.LayoutChoice1, text: strings.LayoutChoice1 },
                  { key: strings.LayoutChoice2, text: strings.LayoutChoice2 }]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
