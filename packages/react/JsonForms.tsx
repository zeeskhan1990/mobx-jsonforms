
import * as React from 'react';
import * as _ from 'lodash';
import { UnknownRenderer } from './UnknownRenderer';
import { mapStoreValuesToRendererProps, JsonFormsProps } from '../core';
import { inject, observer } from "mobx-react"

class JsonFormsRenderer extends React.Component<JsonFormsProps, null> {
  render() {
    const { uischema, schema, path, renderers } =  this.props;

    const renderer = _.maxBy(renderers, r => r.tester(uischema, schema));
  if (renderer === undefined || renderer.tester(uischema, schema) === -1) {
    return <UnknownRenderer type={'renderer'}/>;
  } else {
    const Render = renderer.renderer;

    return (
      <Render
        uischema={uischema}
        schema={schema}
        path={path}
        renderers={renderers}
      />
    );
  }
  }
}

@inject("jsonFormsStore")
@observer
export class JsonForms extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...otherProps} = this.props
    const effectiveProps = mapStoreValuesToRendererProps(jsonFormsStore, otherProps);
    return (
      <JsonFormsRenderer {...effectiveProps}/>
    )
  }
}