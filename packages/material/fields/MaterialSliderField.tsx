import * as React from 'react';
import {
  FieldProps,
  isRangeControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith,
} from '../../core';
import { createPropsForItem } from '../../react';
import {Input} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

const MaterialSliderField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange, scopedSchema } = props;
  const config = {'max': scopedSchema.maximum, 'min': scopedSchema.minimum};

  return (
    <Input
      type='range'
      value={data || scopedSchema.default}
      onChange={ev => handleChange(path, Number(ev.currentTarget.value))}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      inputProps={config}
      endAdornment={<label style={{marginLeft: '0.5em'}}>{data || scopedSchema.default}</label>}
    />
  );
};

export const materialSliderFieldTester: RankedTester = rankWith(4, isRangeControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedSliderField extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialSliderField {...effectiveProps}/>
    )
  }
}