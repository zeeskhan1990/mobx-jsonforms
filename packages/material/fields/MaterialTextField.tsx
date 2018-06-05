import * as React from 'react';
import {
  FieldProps,
  isStringControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith,
} from '../../core';
import { createPropsForItem } from '../../react';
import {Input} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export const MaterialTextField = (props: FieldProps) => {
  const {
    data,
    config,
    className,
    id,
    enabled,
    uischema,
    isValid,
    path,
    handleChange,
    scopedSchema
  } = props;
  const maxLength = scopedSchema.maxLength;
  let inputProps;
  if (config.restrict) {
    inputProps = {'maxLength': maxLength};
  } else {
    inputProps = {};
  }
  if (config.trim && maxLength !== undefined) {
    inputProps.size = maxLength;
  }
  const onChange = ev => handleChange(path, ev.target.value);
  return (
    <Input
      type='text'
      value={data || ''}
      onChange={onChange}
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      multiline={uischema.options && uischema.options.multi}
      fullWidth={!config.trim || maxLength === undefined}
      inputProps={inputProps}
      error={!isValid}
    />
  );
};
/**
 * Default tester for text-based/string controls.
 * @type {RankedTester}
 */
export const materialTextFieldTester: RankedTester = rankWith(1, isStringControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedTextField extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialTextField {...effectiveProps}/>
    )
  }
}