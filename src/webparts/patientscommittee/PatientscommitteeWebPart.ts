import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PatientscommitteeWebPartStrings';
import Patientscommittee from './components/Patientscommittee';
import { IPatientscommitteeProps } from './components/IPatientscommitteeProps';

export interface IPatientscommitteeWebPartProps {
  listName: string;
}

export default class PatientscommitteeWebPart extends BaseClientSideWebPart<IPatientscommitteeWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPatientscommitteeProps > = React.createElement(
      Patientscommittee,
      {
        listName: this.properties.listName,
        webPartContext:this.context
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
                  label: strings.ListName
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
