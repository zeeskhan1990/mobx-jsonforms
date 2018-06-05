
import * as _ from 'lodash';
import { configDefault } from '../configDefault';
import {observable, action} from 'mobx';

export class ConfigStore {
  @observable config: any;

  constructor() {
    this.config = this.applyDefaultConfiguration()
  }

  applyDefaultConfiguration(config: any = {}) {
    _.merge(configDefault, config);
  }

  @action
  setConfiguration = (config: any) => {
    this.config = this.applyDefaultConfiguration(config)
  }
  
}