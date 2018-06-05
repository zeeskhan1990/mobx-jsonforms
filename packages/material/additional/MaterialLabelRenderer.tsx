
import * as React from 'react';
import * as _ from 'lodash';
import {
  isVisible,
  LabelElement,
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
} from '../../core';
import { StatelessRenderer, createPropsForItem } from '../../react';

import {Typography} from '@material-ui/core';
import { inject, observer } from 'mobx-react';

/**
 * Default tester for a label.
 * @type {RankedTester}
 */
export const materialLabelRendererTester: RankedTester = rankWith(1, uiTypeIs('Label'));

/**
 * Default renderer for a label.
 */
export const MaterialLabelRenderer: StatelessRenderer<RendererProps> =
  ({ uischema, visible }) => {
    const labelElement: LabelElement = uischema as LabelElement;
    const style: {[x: string]: any} = {};
    if (!visible) {
      style.display = 'none';
    }
    return (
      <Typography variant='title' style={style}>
        {labelElement.text !== undefined && labelElement.text !== null && labelElement.text}
      </Typography>
    );
  };

const mapStoreValuesToProps = (state, ownProps) => {
  const visible = _.has(ownProps, 'visible') ? ownProps.visible :  isVisible(ownProps, state);

  return {
    visible,
  };
};

@inject("jsonFormsStore")
@observer
export default class MaterializedLabelRenderer extends React.Component<any, null>  {
  render() {    
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToProps)
    return (
      <MaterialLabelRenderer {...effectiveProps}/>
    )
  }
}

//export default connectToJsonForms(mapStoreToProps, null)(MaterialLabelRenderer);
