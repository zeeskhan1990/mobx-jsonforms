
import * as React from 'react';
import {
  FieldProps,
  isEnumControl,
  mapUpdateActionToFieldProps,
  mapStoreValuesToFieldProps,
  RankedTester,
  rankWith,
} from '../../core';
import { createPropsForItem } from '../../react';

import {Select,MenuItem } from '@material-ui/core';

import { inject, observer } from 'mobx-react';

export const MaterialEnumField = (props: FieldProps) => {
  const { data, className, id, enabled, uischema, path, handleChange, scopedSchema } = props;
  const options = scopedSchema.enum;

  return (
    <Select
      className={className}
      id={id}
      disabled={!enabled}
      autoFocus={uischema.options && uischema.options.focus}
      value={data || ''}
      onChange={ev => handleChange(path, ev.target.value)}
      fullWidth={true}
    >
      {
        [<MenuItem value='' key={'empty'} />]
          .concat(
            options.map(optionValue =>
              (
                <MenuItem value={optionValue} key={optionValue}>
                  {optionValue}
                </MenuItem>
              )
            )
          )}
    </Select>
  );
};
/**
 * Default tester for enum controls.
 * @type {RankedTester}
 */
export const materialEnumFieldTester: RankedTester = rankWith(2, isEnumControl);

@inject("jsonFormsStore")
@observer
export default class MaterializedEnumField extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToFieldProps, mapUpdateActionToFieldProps)
    return (
      <MaterialEnumField {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStoreToFieldProps, mapDispatchToFieldProps)(MaterialEnumField);
