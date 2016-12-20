import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';

@Component({
  selector: 'opcloud-rappid-toolbar',
  templateUrl: './rappid-toolbar.component.html',
  styleUrls: ['./rappid-toolbar.component.css']
})
export class RappidToolbarComponent implements OnInit {
  graph;

  constructor(private graphService: GraphService) { }

  ngOnInit() {
    this.graph = this.graphService.getGraph();
  }

  saveModel(modelNameInput) {
    if (!modelNameInput.value) {
      alert('you must provide a name for the model to save');
      return;
    }
    console.log('saving');
    this.graphService.saveModel(modelNameInput.value);
  }

  loadModel(modelNameInput) {
    if (!modelNameInput.value) {
      alert('you must provide a name for the model to load');
      return;
    }
    this.graphService.loadModel(modelNameInput.value);
  }

}
