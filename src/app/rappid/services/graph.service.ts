import { Injectable } from '@angular/core';
import { ModelStorageService, ModelObject } from '../../services/model-storage.service';
const joint = require('rappid');


@Injectable()
export class GraphService {
  graph;
  modelObject;

  constructor(private modelStorage: ModelStorageService) {
    this.graph = new joint.dia.Graph;
    this.modelObject = new ModelObject('myModel', null);
  }
  
  getGraph(name?:string) {
    return name ? this.loadModel(name) : this.graph;
  }

  saveModel(modelName) {
    this.modelObject.saveModel(modelName, this.graph.toJSON());
    this.modelStorage.save(this.modelObject);
  }

  loadModel(name) {
    this.modelObject = this.modelStorage.get(name);
    this.graph.fromJSON(this.modelObject.modelData);
  }

}
