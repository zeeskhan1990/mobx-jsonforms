
import * as React from 'react';
import {
  ControlProps,
  isBooleanControl,
  mapStoreValuesToControlProps,
  RankedTester,
  rankWith
} from '../../core';
import {createPropsForItem } from '../../react';

import { FormControlLabel } from '@material-ui/core';

import MaterialBooleanField from '../fields/MaterialBooleanField';
import { inject, observer } from 'mobx-react';

export const MaterialBooleanControl =
  ({  label, uischema, schema, visible, parentPath }: ControlProps) => {
    let style = {};
    if (!visible) {
      style = {display: 'none'};
    }

    return (
      <FormControlLabel
        style={style}
        label={label}
        control={<MaterialBooleanField uischema={uischema} schema={schema} path={parentPath}/>}
      />
    );
  };

  @inject("jsonFormsStore")
  @observer
  export default class ConnectedMaterialBooleanControl extends React.Component<any, null>  {
    render() {
      const effectiveProps = createPropsForItem(this.props, mapStoreValuesToControlProps)
      return (
        <MaterialBooleanControl {...effectiveProps}/>
      )
    }
  }

/* const ConnectedMaterialBooleanControl = connectToJsonForms(
  mapStoreToControlProps
)(MaterialBooleanControl); */

export const materialBooleanControlTester: RankedTester = rankWith(2, isBooleanControl);
//export default ConnectedMaterialBooleanControl;
