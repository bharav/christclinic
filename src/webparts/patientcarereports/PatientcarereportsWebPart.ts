import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PatientcarereportsWebPartStrings';
import Patientcarereports from './components/Patientcarereports';
import { IPatientcarereportsProps } from './components/IPatientcarereportsProps';

export interface IPatientcarereportsWebPartProps {
  description: string;
}

export default class PatientcarereportsWebPart extends BaseClientSideWebPart<IPatientcarereportsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPatientcarereportsProps > = React.createElement(
      Patientcarereports,
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
