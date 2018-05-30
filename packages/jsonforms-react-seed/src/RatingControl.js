import * as React from 'react';
import { mapStoreValuesToControlProps, mapUpdateActionToControlProps } from '@mobx-jsonforms/core';
import { createPropsForItem } from '@mobx-jsonforms/react';
import { Rating } from './Rating';
import { inject, observer } from 'mobx-react';

const RatingControl = ({ data, handleChange, path }) => (
  <Rating
    value={data}
    onClick={ev => handleChange(path, Number(ev.value))}
  />
);

export default inject("jsonFormsStore")(observer(class extends React.Component  {
  render() {
    const effectiveProps = createPropsForItem(this.props, mapStoreValuesToControlProps, mapUpdateActionToControlProps)
    return (
      <RatingControl {...effectiveProps}/>
    )
  }
}
))