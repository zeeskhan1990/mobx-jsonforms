import * as React from 'react';
import {
  FieldProps,
  isNumberControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith,
} from '../../core';
import { createPropsForItem } from '../../react';
import {Input} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export const MaterialNumberField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const config = {'step': '0.1'};

  return (
    <Input
      type='number'
      value={data || ''}
      onChange={ev => handleChange(path, Number(ev.target.value))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      inputProps={config}
      fullWidth={true}
    />
  );
};
/**
 * Default tester for number controls.
 * @type {RankedTester}
 */
export const materialNumberFieldTester: RankedTester = rankWith(2, isNumberControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedNumberField extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialNumberField {...effectiveProps}/>
    )
  }
}