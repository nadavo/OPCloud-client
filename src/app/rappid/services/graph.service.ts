import { Injectable } from '@angular/core';
import { ModelObject } from '../../services/storage/model-object.class';
import { ModelStorageInterface } from '../../services/storage/model-storage.interface';
const joint = require('rappid');


@Injectable()
export class GraphService {
  graph;
  modelObject;
  modelStorage;

  constructor(modelStorage: ModelStorageInterface) {
    this.modelStorage = modelStorage;
    this.graph = new joint.dia.Graph;
    this.modelObject = new ModelObject('myModel', null);
  }

  getGraph(name?: string) {
    return name ? this.loadModel(name) : this.graph;
  }

  saveModel(modelName) {
    this.modelObject.saveModel(modelName, this.graph.toJSON());
    this.modelStorage.save(this.modelObject);
  }

  loadModel(name) {
    this.modelStorage.get(name).then((res) => {
      this.modelObject = res;
        this.graph.fromJSON(this.modelObject.modelData);
    });
  }

}
