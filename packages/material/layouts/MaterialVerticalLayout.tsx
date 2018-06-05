import * as React from 'react';
import {
  mapStoreValuesToLayoutProps,
  RankedTester,
  rankWith,
  RendererProps,
  uiTypeIs,
  VerticalLayout,
} from '../../core';
import { createPropsForItem } from '../../react';
import { MaterialLayoutRenderer, MaterialLayoutRendererProps } from '../util/layout';
import { inject, observer } from 'mobx-react';

/**
 * Default tester for a vertical layout.
 * @type {RankedTester}
 */
export const materialVerticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));

export const MaterialVerticalLayoutRenderer  = (
  { schema, uischema, path, visible }: RendererProps) => {
  const verticalLayout = uischema as VerticalLayout;
  const childProps: MaterialLayoutRendererProps = {
    elements: verticalLayout.elements,
    schema,
    path,
    direction: 'column',
    visible
  };

  return <MaterialLayoutRenderer {...childProps}/>;
};

@inject("jsonFormsStore")
@observer
export default class MaterialVerticalLayout extends React.Component<any, null>  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToLayoutProps)
    return (
      <MaterialVerticalLayoutRenderer {...effectiveProps}/>
    )
  }
}