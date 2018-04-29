import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PatientQuoteWebPartStrings';
import PatientQuote from './components/PatientQuote';
import { IPatientQuoteProps } from './components/IPatientQuoteProps';

export interface IPatientQuoteWebPartProps {
  description: string;
}

export default class PatientQuoteWebPart extends BaseClientSideWebPart<IPatientQuoteWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPatientQuoteProps > = React.createElement(
      PatientQuote,
      {
        description: this.properties.description
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
