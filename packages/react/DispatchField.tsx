import * as React from 'react';
import * as _ from 'lodash';
import { UnknownRenderer } from './UnknownRenderer';
import {observer, inject} from 'mobx-react'
import { DispatchFieldProps, mapStoreValuesToDispatchFieldProps } from '../core';
/**dProps } from '@mobx-jsonforms/core';
/**
 * Props of the {@link DispatchField} renderer.
 */
  /**
   * The available field renderers.
   */

const Dispatch = (dispatchFieldProps: DispatchFieldProps) => {
  const uischema = dispatchFieldProps.uischema;
  const schema = dispatchFieldProps.schema;
  const field = _.maxBy(dispatchFieldProps.fields, r => r.tester(uischema, schema));

  if (field === undefined || field.tester(uischema, schema) === -1) {
    return <UnknownRenderer type={'field'}/>;
  } else {
    const Field = field.field;
    return (
      <Field
        schema={schema}
        uischema={uischema}
        path={dispatchFieldProps.path}
      />
    );
  }
};

@inject("jsonFormsStore")
@observer
export class DispatchField extends React.Component<any, null>  {
  render() {
    const {jsonFormsStore, ...ownProps} = this.props
    const effectiveProps = mapStoreValuesToDispatchFieldProps(jsonFormsStore, ownProps);
    return (
      <Dispatch {...effectiveProps}/>
    )
  }
}