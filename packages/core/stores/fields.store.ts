
import { RankedTester } from '../testers';
import {observable, action} from 'mobx';

export class FieldStore {
  @observable fields: { tester: RankedTester, field: any }[]

  constructor() {
    this.fields = []
  }

  @action
  setFields = (fields) => {
    this.fields = fields;
  }

  @action
  addField = (tester, field) => {
    this.fields =  this.fields.concat([{ tester, field }]);
  }

  @action
  removeField = (tester) => {
    this.fields = this.fields.filter(t => t.tester !== tester);
  }
}