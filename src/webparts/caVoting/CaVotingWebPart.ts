import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'CaVotingWebPartStrings';
import CaVoting from './components/CaVoting';
import { ICaVotingProps } from './components/ICaVotingProps';

export interface ICaVotingWebPartProps {
  configListName: string;
  optionsListName:string;
}

export default class CaVotingWebPart extends BaseClientSideWebPart<ICaVotingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ICaVotingProps > = React.createElement(
      CaVoting,
      {
        configListName: this.properties.configListName,
        optionsListName: this.properties.optionsListName,
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
                PropertyPaneTextField('configListName', {
                  label: strings.ConfigListFieldLabel
                }),
                PropertyPaneTextField('optionsListName', {
                  label: strings.OptionsListFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
