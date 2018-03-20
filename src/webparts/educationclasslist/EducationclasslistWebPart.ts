import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'EducationclasslistWebPartStrings';
import Educationclasslist from './components/Educationclasslist';
import { IEducationclasslistProps } from './components/IEducationclasslistProps';

export interface IEducationclasslistWebPartProps {
  listName:string;
  classType:string;
}

export default class EducationclasslistWebPart extends BaseClientSideWebPart<IEducationclasslistWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IEducationclasslistProps > = React.createElement(
      Educationclasslist,
      {
        listName: this.properties.listName,
        classType:this.properties.classType,
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
                }),
                PropertyPaneTextField('classType', {
                  label: strings.classtypeFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
