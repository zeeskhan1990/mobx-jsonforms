
import { RendererStore } from './renderers.store';
import { FieldStore } from './fields.store';
import { ConfigStore } from './config.store';
import { CoreStore } from './core.store';
import { TransformPropsStore } from './transformProps.store'

export interface IJsonFormsStore {
  rendererStore: RendererStore
  fieldStore: FieldStore
  coreStore: CoreStore
  configStore: ConfigStore
  transformPropsStore: TransformPropsStore
}

/* export const getData = coreStore.extractData
export const getSchema = coreStore.extractSchema
export const getUiSchema = coreStore.extractUiSchema */

/* export const getConfig = configStore.config */
