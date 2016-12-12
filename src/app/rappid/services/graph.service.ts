import { Injectable } from '@angular/core';
const joint = require('rappid');


@Injectable()
export class GraphService {
  graph;

  constructor() {
    this.graph = new joint.dia.Graph;
  }
  
  getGraph() {
    return this.graph;
  }

}
