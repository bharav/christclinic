import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AcceptOrRejectEventWebPartStrings';
import AcceptOrRejectEvent from './components/AcceptOrRejectEvent';
import { IAcceptOrRejectEventProps } from './components/IAcceptOrRejectEventProps';

export interface IAcceptOrRejectEventWebPartProps {
  listname: string;
}

export default class AcceptOrRejectEventWebPart extends BaseClientSideWebPart<IAcceptOrRejectEventWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAcceptOrRejectEventProps > = React.createElement(
      AcceptOrRejectEvent,
      {
        listname: this.properties.listname,
        webpartcontext:this.context
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
                PropertyPaneTextField('listname', {
                  label: strings.EventListName
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
