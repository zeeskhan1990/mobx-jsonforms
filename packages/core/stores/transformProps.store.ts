
import {observable, action} from 'mobx';

export class TransformPropsStore {
  @observable transformers: any[]

  constructor() {
    this.transformers = []
  }

  @action
  setTransformers = (transformers) => {
    this.transformers = transformers;
  }

  @action
  addTransformer = (transformer) => {
    this.transformers = this.transformers.concat([transformer]);
  }
}
