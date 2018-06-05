import * as React from 'react';
import {
  FieldProps,
  isTimeControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith,
} from '../../core';
import { createPropsForItem } from '../../react';
import {Input} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export const MaterialTimeField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <Input
      type='time'
      value={data || ''}
      onChange={ev => handleChange(path, ev.target.value)}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      fullWidth={true}
    />
    );
};
export const materialTimeFieldTester: RankedTester = rankWith(2, isTimeControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedTimeField extends React.Component<any, null>  {
  render() {
    /* const {jsonFormsStore, ...ownProps} = this.props
    const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStoreValuesToFieldProps)
    //Merge the dispatch prop here
    const effectiveProps = Object.assign({}, effectiveFromStateProps, mapUpdateActionToFieldProps(jsonFormsStore)) */

    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialTimeField {...effectiveProps}/>
    )
  }
}