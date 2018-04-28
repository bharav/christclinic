import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpecialistRequestChartWebPartStrings';
import SpecialistRequestChart from './components/SpecialistRequestChart';
import { ISpecialistRequestChartProps } from './components/ISpecialistRequestChartProps';

export interface ISpecialistRequestChartWebPartProps {
  listName: string;
}

export default class SpecialistRequestChartWebPart extends BaseClientSideWebPart<ISpecialistRequestChartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpecialistRequestChartProps > = React.createElement(
      SpecialistRequestChart,
      {
        listName: this.properties.listName,
        context:  this.context
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
                PropertyPaneTextField('listName', {
                  label: strings.listNameFieldName
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
