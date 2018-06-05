
import * as React from 'react';
import {
  FieldProps,
  isBooleanControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith
} from '../../core';
import { createPropsForItem } from '../../react';
import {Checkbox} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export const MaterialBooleanField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange } = props;
  const config = {'autoFocus': uischema.options && uischema.options.focus};

  return (
    <Checkbox
      checked={data || ''}
      onChange={(_ev, checked) => handleChange(path, checked)}
      className={className}
      id={id}
      disabled={!enabled}
      inputProps={config}
    />
  );
};

export const materialBooleanFieldTester: RankedTester = rankWith(2, isBooleanControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedBooleanField extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialBooleanField {...effectiveProps}/>
    )
  }
}