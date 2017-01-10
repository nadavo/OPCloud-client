import { Injectable } from '@angular/core';
import { ModelStorageService, ModelObject } from '../../services/model-storage.service';
const joint = require('rappid');
const _ = require('lodash');


@Injectable()
export class GraphService {
  graph;
  modelObject;

  constructor(private modelStorage: ModelStorageService) {
    this.graph = new joint.dia.Graph;
    this.modelObject = new ModelObject('myModel', null);

    this.graph.JSON = {};
    this.graph.updateJSON = function () {
      this.JSON = this.toJSON();
      console.log("updateJSON() --- Graph JSON updated!", this.JSON);
    };
    _.bind(this.graph.updateJSON, this.graph);

    this.graph.on('add', this.graph.updateJSON, this.graph);
    this.graph.on('remove', this.graph.updateJSON, this.graph);
    this.graph.on('change:position', this.graph.updateJSON, this.graph);
    this.graph.on('change:attrs', this.graph.updateJSON, this.graph);
    this.graph.on('change:size', this.graph.updateJSON, this.graph);
    this.graph.on('change:angle', this.graph.updateJSON, this.graph);

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
