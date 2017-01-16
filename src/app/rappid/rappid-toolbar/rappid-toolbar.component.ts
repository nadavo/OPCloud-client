import { Component, OnInit } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { SaveModelDialogComponent } from '../../dialogs/save-model-dialog/save-model-dialog.component';
import { MdDialog } from '@angular/material';
import { LoadModelDialogComponent } from '../../dialogs/load-model-dialog/load-model-dialog.component';
import { CommandManagerService } from '../services/command-manager.service';

@Component({
  selector: 'opcloud-rappid-toolbar',
  templateUrl: './rappid-toolbar.component.html',
  styleUrls: ['./rappid-toolbar.component.css']
})
export class RappidToolbarComponent implements OnInit {
  graph;
  modelName: string;
  private commandManager;

  constructor(private graphService: GraphService,
              commandManagerService: CommandManagerService,
              private _dialog: MdDialog) {
    this.commandManager = commandManagerService.commandManager;
  }

  ngOnInit() {
    this.graph = this.graphService.getGraph();
  }

  undo() {
    this.commandManager.undo();
    this.graphService.updateJSON();
  }

  redo() {
    this.commandManager.redo();
    this.graphService.updateJSON();
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
