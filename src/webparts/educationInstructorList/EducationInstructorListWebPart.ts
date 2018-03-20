import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'EducationInstructorListWebPartStrings';
import EducationInstructorList from './components/EducationInstructorList';
import { IEducationInstructorListProps } from './components/IEducationInstructorListProps';

export interface IEducationInstructorListWebPartProps {
  listName:string;
}

export default class EducationInstructorListWebPart extends BaseClientSideWebPart<IEducationInstructorListWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEducationInstructorListProps > = React.createElement(
      EducationInstructorList,
      {
        listName: this.properties.listName,
        webpartContext:this.context
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
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
