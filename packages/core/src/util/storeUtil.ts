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
import { RankedTester } from '../testers';
import { JsonSchema, UISchemaElement } from '../';
import { generateDefaultUISchema, generateJsonSchema } from '../generators';
import {IJsonFormsStore} from '../stores/index';
import { RendererStore } from '../stores/renderers.store';
import { FieldStore } from '../stores/fields.store';
import { ConfigStore } from '../stores/config.store';
import { CoreStore } from '../stores/core.store';
import {TransformPropsStore} from '../stores/transformProps.store'

export const initializeStore = (): IJsonFormsStore =>  {
  const jsonFormsStore =   {
    rendererStore: new RendererStore(),
    fieldStore: new FieldStore(),
    coreStore: new CoreStore(),
    configStore: new ConfigStore(),
    transformPropsStore: new TransformPropsStore()
  }
  return jsonFormsStore
};

export const activateStore = (
  data: any,
  schema: JsonSchema = generateJsonSchema(data),
  uischema: UISchemaElement = generateDefaultUISchema(schema),
  jsonFormsStore: IJsonFormsStore = initializeStore()
) : IJsonFormsStore =>  {
  jsonFormsStore.coreStore.initialize(data, schema, uischema)
  return jsonFormsStore
}

export const setData = (data: Object, jsonFormsStore: IJsonFormsStore) : IJsonFormsStore => {
  jsonFormsStore.coreStore.setData(data)
  return jsonFormsStore
}

export const updateStore =
  (path: string, updater: (any) => any, jsonFormsStore: IJsonFormsStore): IJsonFormsStore =>  {
    jsonFormsStore.coreStore.updateData(path, updater)
    return jsonFormsStore
  }

export const setRenderers = (
  renderers: {tester: RankedTester, renderer: any }[],
  jsonFormsStore: IJsonFormsStore
): IJsonFormsStore => {
  jsonFormsStore.rendererStore.setRenderers(renderers)
  return jsonFormsStore
}

export const registerRenderer = (
  tester: RankedTester,
  renderer: any,
  jsonFormsStore: IJsonFormsStore
): IJsonFormsStore => {
  jsonFormsStore.rendererStore.addRenderer(tester, renderer)
  return jsonFormsStore
}

export const setFields = (
  fields: {tester: RankedTester, field: any }[],
  jsonFormsStore: IJsonFormsStore
): IJsonFormsStore => {
  jsonFormsStore.fieldStore.setFields(fields)
  return jsonFormsStore
}

export const registerField = (
  tester: RankedTester,
  field: any,
  jsonFormsStore: IJsonFormsStore
): IJsonFormsStore => {
  jsonFormsStore.fieldStore.addField(tester, field)
  return jsonFormsStore
}

export const unregisterField = (
  tester: RankedTester,
  jsonFormsStore: IJsonFormsStore
): IJsonFormsStore => {
  jsonFormsStore.fieldStore.removeField(tester)
  return jsonFormsStore
}

export const unregisterRenderer = (
  tester: RankedTester,
  jsonFormsStore: IJsonFormsStore
): IJsonFormsStore => {
  jsonFormsStore.rendererStore.removeRenderer(tester)
  return jsonFormsStore
}

export const setConfig = (config: any,
  jsonFormsStore: IJsonFormsStore): IJsonFormsStore => {
    jsonFormsStore.configStore.setConfiguration(config)
    return jsonFormsStore
  }