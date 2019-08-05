import * as React from 'react';
import styles from './TaxonomyPickerWebpart.module.scss';
import { ITaxonomyPickerWebpartProps } from './ITaxonomyPickerWebpartProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as $ from 'jquery';
import { ToastContainer, toast } from 'react-toastify';

import {
  ITaxonomyPickerProps,
  TaxonomyPicker as Tx
} from "@dlw-digitalworkplace/react-fabric-taxonomypicker";

import { SPComponentLoader } from '@microsoft/sp-loader';
export default class TaxonomyPickerWebpart extends React.Component<ITaxonomyPickerWebpartProps, {}> {

  componentDidMount() {

    let siteColUrl = this.props.siteurl;
    try {
      SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/init.js', {
        globalExportsName: '$_global_init'
      })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/MicrosoftAjax.js', {
            globalExportsName: 'Sys'
          });
        })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.Runtime.js', {
            globalExportsName: 'SP'
          });
        })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.js', {
            globalExportsName: 'SP'
          });
        })
        .then((): Promise<{}> => {
          return SPComponentLoader.loadScript(siteColUrl + '/_layouts/15/SP.taxonomy.js', {
            globalExportsName: 'SP'
          });
        })
        .then((): void => {
          // this.setState({ loadingScripts: false });
          console.log("last then");
        })
        .catch((reason: any) => {
          // this.setState({ loadingScripts: false, errors: [...this.state.errors, reason] });
          console.log("Second last catch");
        });
    } catch (error) {
      // this.setState({ loadingScripts: false, errors: [...this.state.errors, error] });
      console.log("last catch");
    }

  }

  public render(): React.ReactElement<ITaxonomyPickerWebpartProps> {
    return (
      <div className={styles.taxonomyPickerWebpart}>
        <ToastContainer className='toast-container' toastClassName="dark-toast" position={toast.POSITION.TOP_RIGHT} />

        <Tx
          title="Select your demo data"
          absoluteSiteUrl={this.props.siteurl}
          label="Demo picker"
          termSetId="36618396-2f9a-48f4-8ddb-944e08fbd47d"
          // rootTermId="4ccfb7f2-d62c-4b28-bb39-dae68e2ccba9"
          itemLimit={20}
          allowAddTerms={true}
          lcid={1033}
          isLoading={false}
        />



      </div>
    );
  }
}
