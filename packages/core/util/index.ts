
import { JsonSchema, Scopable, IJsonFormsStore } from '../';
import { resolveData, resolveSchema } from './resolvers';
import { compose as composePaths, composeWithUi, toDataPath, toDataPathSegments } from './path';
import { isEnabled, isVisible } from './runtime';
import { ErrorObject } from 'ajv';

export { createLabelDescriptionFrom } from './label';

/**
 * Escape the given string such that it can be used as a class name,
 * i.e. hashes and slashes will be replaced.
 *
 * @param {string} s the string that should be converted to a valid class name
 * @returns {string} the escaped string
 */
export const convertToValidClassName = (s: string): string =>
  s.replace('#', 'root')
   .replace(new RegExp('/', 'g'), '_');

export const formatErrorMessage = errors => {
  if (errors === undefined || errors === null) {
    return '';
  }

  return errors.join('\n');
};

/**
 * Convenience wrapper around resolveData and resolveSchema.
 */
const Resolve: {
  schema(schema: JsonSchema, schemaPath: string): JsonSchema;
  data(data, path): any
} = {
  schema: resolveSchema,
  data: resolveData
};
export { resolveData, resolveSchema } from './resolvers';
export { Resolve };

// Paths --
const fromScopable = (scopable: Scopable) => toDataPathSegments(scopable.scope).join('.');

const Paths = {
  compose: composePaths,
  fromScopable
};
export { composePaths, composeWithUi, Paths, toDataPath };

// Runtime --
const Runtime: any = {
  isEnabled,
  isVisible
};

const getErrorAt: (any, IJsonFormsStore) => ErrorObject[] = (instancePath, store) => {
  return store.coreStore.errorAt(instancePath);
};

const getPropsTransformers = (store:IJsonFormsStore) => store.transformPropsStore.transformers;

const getSubErrorsAt: (any, IJsonFormsStore) => ErrorObject[] = (instancePath, store) => {
  return store.coreStore.errorAt(instancePath);
};

export { isEnabled, isVisible, Runtime, getErrorAt, getPropsTransformers, getSubErrorsAt };

export * from './renderer';
export * from './field';
export * from './runtime';
export * from './Formatted';
export * from './storeUtil';
