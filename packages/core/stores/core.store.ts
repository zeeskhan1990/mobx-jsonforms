
import * as _ from 'lodash';
import * as AJV from 'ajv';
import { ErrorObject, ValidateFunction } from 'ajv';
import {observable, action, computed} from 'mobx';
import { JsonSchema, UISchemaElement } from '..';

export class CoreStore {
  @observable data: object;
  @observable schema: object;
  @observable uischema: object;
  @observable errors: AJV.ErrorObject[];
  @observable validator: AJV.ValidateFunction;

  private ajv = new AJV({ allErrors: true, jsonPointers: true, errorDataPath: 'property' });

  constructor() {
    this.data = {}
    this.schema  = {}
    this.uischema = {}
    this.errors = []
    this.validator = () => true

    this.init()
  }

  init() {
    this.ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
  }

  validate(validator: ValidateFunction, data: any): ErrorObject[] {
    const valid = validator(data);
    if (valid) {
      return [];
    }
  
    return validator.errors;
  };

  sanitizeErrors(validator, data): ErrorObject[] {
    let sanitizedErrors = [];
    sanitizedErrors = this.validate(validator, data).map(error => {
      error.dataPath = error.dataPath.replace(/\//g, '.').substr(1);
  
      return error;
    });
    return sanitizedErrors
  }

  @computed get extractData() {
    return this.data
  }

  @computed get extractSchema() {
    return this.schema
  }

  @computed get extractUiSchema() {
    return this.uischema
  }

  errorAt = (instancePath) => {
    return _.filter(this.errors, (error: ErrorObject) => error.dataPath === instancePath);
  }

  subErrorsAt = (instancePath) => {
    const path = `${instancePath}.`;

    return _.filter(this.errors, (error: ErrorObject) => error.dataPath.startsWith(path));
  }

  @action
  initialize = (data, schema: JsonSchema, uischema: UISchemaElement) => {
    this.data = data
    this.schema = schema
    this.uischema = uischema
    this.validator = this.ajv.compile(schema)
    this.errors = this.sanitizeErrors(this.validator, data)
  }

  @action
  updateData = (path: string, updater: (any) => any) => {
    if (path === undefined || path === null) {
      //no-op;
    } else if (path === '') {
      // empty path is ok
      const result = updater(this.data);

      if (result === undefined || result === null) {
        //no-op;
      }

      const sanitizedErrors = this.sanitizeErrors(this.validator, result);
      this.data = result
      this.errors = sanitizedErrors
    } else {
      const oldData: any = _.get(this.data, path);
      const newData = updater(oldData);
      const newState: any = _.set(_.cloneDeep(this.data), path, newData);
      const sanitizedErrors = this.sanitizeErrors(this.validator, newState);
      this.data = newState
      this.errors = sanitizedErrors
    }
  }
}