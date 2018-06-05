
import * as React from 'react';
import {
  FieldProps,
  isIntegerControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith
} from '../../core';
import { createPropsForItem } from '../../react';
import {Input} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export const MaterialIntegerField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const config = {'step': '1'};

  return (
    <Input
      type='number'
      value={data || ''}
      onChange={ev => handleChange(path, parseInt(ev.target.value, 10))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      inputProps={config}
      fullWidth={true}
    />
  );
};
export const materialIntegerFieldTester: RankedTester = rankWith(2, isIntegerControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedIntegerField extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialIntegerField {...effectiveProps}/>
    )
  }
}