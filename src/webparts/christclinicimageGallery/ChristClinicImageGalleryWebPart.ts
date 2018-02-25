import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from "ChristClinicImageGalleryWebPartStrings";
import ImageGallery from './components/CCImageGallery';
import { ICCImageGalleryProps } from './components/ICCImageGalleryProps';
import CCImageGalleryDataProvider from "./data/CCImageGalleryDataProvider";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

export interface IChristClinicImageGalleryWebPartProps {
  searchQuery:string;
}

export default class ChristClinicImageGalleryWebPart extends BaseClientSideWebPart<IChristClinicImageGalleryWebPartProps> {
  private _dataProvider: any;
  protected onInit(): Promise<void> {
    if (Environment.type !== EnvironmentType.Local) {
      this._dataProvider = new CCImageGalleryDataProvider(this.context);
    }
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<ICCImageGalleryProps > = React.createElement(
      ImageGallery,
      {
        dataprovider:this._dataProvider,
        searchQuery:this.properties.searchQuery
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
