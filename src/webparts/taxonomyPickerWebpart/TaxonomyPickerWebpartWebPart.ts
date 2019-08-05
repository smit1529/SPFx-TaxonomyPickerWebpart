import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'TaxonomyPickerWebpartWebPartStrings';
import TaxonomyPickerWebpart from './components/TaxonomyPickerWebpart';
import { ITaxonomyPickerWebpartProps } from './components/ITaxonomyPickerWebpartProps';

export interface ITaxonomyPickerWebpartWebPartProps {
  description: string;
}

export default class TaxonomyPickerWebpartWebPart extends BaseClientSideWebPart<ITaxonomyPickerWebpartWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITaxonomyPickerWebpartProps > = React.createElement(
      TaxonomyPickerWebpart,
      {
        description: this.properties.description,
        context: this.context,
        spHttpClient: this.context.spHttpClient,
        siteurl: this.context.pageContext.web.absoluteUrl,
        userPermissions : this.context.pageContext.web.permissions
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
