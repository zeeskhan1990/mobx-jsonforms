import * as React from 'react';
import * as DOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider, observer } from 'mobx-react';
import { materialFields, materialRenderers } from '@mobx-jsonforms/material-renderers';
import {JsonForms} from '@mobx-jsonforms/react'
import RatingControl from './RatingControl';
import ratingControlTester from './ratingControlTester'
import * as jsonformsCore from '@mobx-jsonforms/core';
import { IJsonFormsStore } from '@mobx-jsonforms/core';

const schema = {
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "done": {
      "type": "boolean"
    },
    "due_date": {
      "type": "string",
      "format": "date"
    },
    "rating": {
      "type": "integer",
      "maximum": 5
    },
    "recurrence": {
      "type": "string",
      "enum": [
        "Never",
        "Daily",
        "Weekly",
        "Monthly"
      ]
    },
    "recurrence_interval": {
      "type": "integer"
    }
  },
  "required": [
    "name"
  ]
}

const uischema = {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "label": false,
      "scope": "#/properties/done"
    },
    {
      "type": "Control",
      "scope": "#/properties/name"
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/due_date"
        },
        {
          "type": "Control",
          "scope": "#/properties/rating"
        }
      ]
    },
    {
      "type": "Control",
      "scope": "#/properties/description",
      "options": {
          "multi": true
      }
    },
    {
      "type": "HorizontalLayout",
      "elements": [
        {
          "type": "Control",
          "scope": "#/properties/recurrence"
        },
        {
          "type": "Control",
          "scope": "#/properties/recurrence_interval",
          "rule": {
              "effect": "HIDE",
              "condition": {
                  "scope": "#/properties/recurrence",
                  "expectedValue": "Never"
              }
          }
        }
      ]
    }
  ]
}

const data = {
  name: 'Send email to Adrian',
  description: 'Confirm if you have passed the subject\nHereby ...',
  done: true,
  recurrence: 'Daily',
  rating: 3,
};

//const jsonFormsStore: IJsonFormsStore =   jsonformsCore.initializeStore()

const jsonFormsStore: IJsonFormsStore = jsonformsCore.activateStore(data, schema, uischema)
jsonformsCore.setFields(materialFields, jsonFormsStore)
jsonformsCore.setRenderers(materialRenderers, jsonFormsStore)
jsonformsCore.registerRenderer(ratingControlTester, RatingControl, jsonFormsStore)




/* const store = createStore(
  combineReducers({ jsonforms: jsonformsReducer() }),
  {
    jsonforms: {
      fields: materialFields,
      renderers: materialRenderers
    },
  }
);

store.dispatch(Actions.init(data, schema, uischema)); */


// Uncomment this line (and respective import) to register our custom renderer
//store.dispatch(Actions.registerRenderer(ratingControlTester, RatingControl));

const store = {}

const allStores = {...store, ...jsonFormsStore}

@observer
export class RootComponent extends React.Component {
  render() {
    return (
      <Provider {...allStores}>
        <App />
      </Provider>
    );
  }
}


DOM.render(
  <RootComponent/>,
  document.getElementById('root')
);
registerServiceWorker();
