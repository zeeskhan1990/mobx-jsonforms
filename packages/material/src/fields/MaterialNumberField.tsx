/*
  The MIT License
  
  Copyright (c) 2018 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import * as React from 'react';
import {
  FieldProps,
  isNumberControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith,
} from '@mobx-jsonforms/core';
import { createPropsForItem } from '@mobx-jsonforms/react';
import Input from '@material-ui/core/Input';
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