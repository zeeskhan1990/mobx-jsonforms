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
import * as _ from 'lodash';
import {
    mapStoreValuesToControlProps,
    IJsonFormsStore
    } from '@mobx-jsonforms/core';
import { getPropsTransformers } from '@mobx-jsonforms/core'


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