import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { JsonForms } from '@mobx-jsonforms/react';
import { inject, observer } from 'mobx-react';
import {schema, uischema} from './FormConfig'

class App extends Component {
  render() {
    debugger
    const printedStore = JSON.stringify(this.props.jsonFormsStore, null, 2)
    const data = this.props.jsonFormsStore.coreStore.extractData
    return (
      <div>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to JSON Forms with React</h1>
            <p className="App-intro">More Forms. Less Code.</p>
          </header>
        </div>

        <h4 className="data-title">Bound data</h4>
        <div className="data-content">
          <pre>Show Data Here</pre>
        </div>

        <div className="demoform">
          <JsonForms schema={schema.basic} uischema={uischema.basic} path='basic'/>
          <JsonForms schema={schema.address} uischema={uischema.address} path='address'/>
        </div>
      </div>
    );
  }

}

export default inject('storeOne', 'storeTwo', 'jsonFormsStore')(observer(({storeOne, storeTwo, jsonFormsStore}) => {
  debugger
  return (
    <div>
      <App storeOne={storeOne} storeTwo={storeTwo} jsonFormsStore={jsonFormsStore}/>
    </div>
  )
}))

/* const mapStateToProps = state => {
  return { dataAsString: JSON.stringify(getData(state), null, 2) }
}; */
