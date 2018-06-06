import * as React from 'react';
import * as DOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider, observer } from 'mobx-react';
import { extendObservable } from 'mobx';
import { materialFields, materialRenderers } from '@mobx-jsonforms/material-renderers';
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester'
import * as jsonformsCore from '@mobx-jsonforms/core';
import {schema, uischema, data} from './FormConfig'

/* If data is passed then that is set as the init data, else no data is set on the startup */
const jsonFormsStore =   jsonformsCore.initializeStore()
jsonformsCore.setData(data, jsonFormsStore)

/* OR ---- Set data, and also set a global schema and uischema object */
//const jsonFormsStore = jsonformsCore.activateStore(data, schema, uischema)

jsonformsCore.setFields(materialFields, jsonFormsStore)
jsonformsCore.setRenderers(materialRenderers, jsonFormsStore)
jsonformsCore.registerRenderer(ratingControlTester, RatingControl, jsonFormsStore)

class Store {
	constructor(prop) {
		extendObservable(this, {
    		prop
    });
	}
}

const stores = { 
  storeOne: new Store('Property from storeOne'),
  storeTwo: new Store('Property  from storeTwo'),
  jsonFormsStore: jsonFormsStore
}

const RootComponent = observer(class RootComponent extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <App />
      </Provider>
    );
  }
})


DOM.render(
  <RootComponent/>,
  document.getElementById('root')
);
registerServiceWorker();