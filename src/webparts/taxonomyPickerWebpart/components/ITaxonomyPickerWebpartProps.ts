import {
  SPHttpClient
} from '@microsoft/sp-http';

export interface ITaxonomyPickerWebpartProps {
  description: string;
  context: any;
  spHttpClient: SPHttpClient;
  siteurl: string;
  BoardId?:any;
  userPermissions? : any;
}
