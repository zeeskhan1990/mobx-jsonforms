
import * as React from 'react';
import {
  FieldProps,
  isDateControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith
} from '../../core';
import { createPropsForItem } from '../../react';
import {Input} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export const MaterialDateField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;

  return (
    <Input
      type='date'
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
export const materialDateFieldTester: RankedTester = rankWith(2, isDateControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedDateField extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialDateField {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStoreToFieldProps, mapActionToFieldProps)(mapActionToFieldProps);
