
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
  return  {
    rendererStore: new RendererStore(),
    fieldStore: new FieldStore(),
    coreStore: new CoreStore(),
    configStore: new ConfigStore(),
    transformPropsStore: new TransformPropsStore()
  }
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