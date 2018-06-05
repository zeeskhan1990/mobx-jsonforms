
import * as React from 'react';
import {
  computeLabel,
  ControlProps,
  ControlState,
  formatErrorMessage,
  isControl,
  isDescriptionHidden,
  isPlainLabel,
  mapStoreValuesToControlProps,
  RankedTester,
  rankWith
} from '../..//core';
import { Control, DispatchField, createPropsForItem } from '../../react';

import { InputLabel, FormControl, FormHelperText } from '@material-ui/core';
import { inject, observer } from 'mobx-react';

export class MaterialInputControl extends Control<ControlProps, ControlState> {
  render() {
    const {
      id,
      description,
      errors,
      label,
      uischema,
      schema,
      visible,
      required,
      parentPath,
      config
    } = this.props;
    const isValid = errors.length === 0;
    const trim = config.trim;
    const style: {[x: string]: any} = {};
    if (!visible) {
      style.display = 'none';
    }
    const showDescription = !isDescriptionHidden(visible, description, this.state.isFocused);
    return (
      <FormControl
        style={style}
        fullWidth={!trim}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
      >
        <InputLabel htmlFor={id} error={!isValid}>
          {computeLabel(isPlainLabel(label) ? label : label.default, required)}
        </InputLabel>
        <DispatchField uischema={uischema} schema={schema} path={parentPath} />
        <FormHelperText error={!isValid}>
          {!isValid ? formatErrorMessage(errors) : showDescription ? description : null}
        </FormHelperText>
      </FormControl>
    );
  }
}
export const materialInputControlTester: RankedTester = rankWith(1, isControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedInputControl extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToControlProps)
    return (
      <MaterialInputControl {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStoreToControlProps)(MaterialInputControl);
