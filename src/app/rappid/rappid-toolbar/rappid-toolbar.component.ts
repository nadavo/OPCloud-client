import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { SaveModelDialogComponent } from '../../dialogs/save-model-dialog/save-model-dialog.component';
import { MdDialog } from '@angular/material';
import { LoadModelDialogComponent } from '../../dialogs/load-model-dialog/load-model-dialog.component';

@Component({
  selector: 'opcloud-rappid-toolbar',
  templateUrl: './rappid-toolbar.component.html',
  styleUrls: ['./rappid-toolbar.component.css']
})
export class RappidToolbarComponent implements OnInit {
  graph;
  modelName: string;

  constructor(private graphService: GraphService, private _dialog: MdDialog) {
  }

  ngOnInit() {
    this.graph = this.graphService.getGraph();
  }

  undo() {
    console.log('Undoing');
  }

  saveModel() {
    if (!this.modelName) {
      return this.saveModelAs();
    }

    this.graphService.saveModel(this.modelName);
  }

  saveModelAs() {
    let dialogRef = this._dialog.open(SaveModelDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.modelName = result;
      }
    });
  }

  loadModel() {
    let dialogRef = this._dialog.open(LoadModelDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!!result) {
        this.graphService.loadModel(result);
        this.modelName = result;
      }
    });
  }

}
