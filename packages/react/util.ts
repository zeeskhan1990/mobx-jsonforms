
import * as _ from 'lodash';
import {
    mapStoreValuesToControlProps,
    IJsonFormsStore
    } from '../core';
import { getPropsTransformers } from '../core'


export const mergeTransformProps = (
  store: IJsonFormsStore,
  ownProps: any,
  mapStoreValuesToProps: (store: IJsonFormsStore, ownProps: any) => any = mapStoreValuesToControlProps) => {
    const transformedProps =  (getPropsTransformers(store) || []).reduce(
      (props, materializer) =>
        _.merge(props, materializer(store, props)),
      mapStoreValuesToProps(store, ownProps)
    )
    return transformedProps
  }

  export const createPropsForItem = (inputProps: any,
    mapStoreValuesToProps: (store: IJsonFormsStore, ownProps: any) => any,
    mapUpdateActionToProps: (store: IJsonFormsStore) => any = null) => {

      const {jsonFormsStore, ...ownProps} = inputProps
      const effectiveFromStateProps = mergeTransformProps(jsonFormsStore, ownProps, mapStoreValuesToProps)
      const actionProps = mapUpdateActionToProps ? mapUpdateActionToProps(jsonFormsStore) : {}

      return Object.assign({}, effectiveFromStateProps, actionProps)
  }