import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { ModelStorageService } from '../../services/model-storage.service';

@Component({
  selector: 'app-load-model-dialog',
  template: `
    <p>Load Model</p>
    <p>
      <label>
        Select a model to load
      </label>
    </p>
    <ul>
      <li *ngFor="let model of models" (click)="select(model)" [ngClass]="model === selected ? 'selected' : ''">{{model}}</li>
    </ul>
    <p> 
      <button md-button (click)="dialogRef.close(selected)">LOAD</button> 
      <button md-button (click)="dialogRef.close()">CANCEL</button> 
    </p>
  `,
  styleUrls: ['./load-model-dialog.component.css']
})
export class LoadModelDialogComponent implements OnInit {
  models;
  selected;

  constructor(
    @Optional() public dialogRef: MdDialogRef<LoadModelDialogComponent>,
    private modelStorageService: ModelStorageService) {

    this.models = modelStorageService.getModels();
  }

  ngOnInit() {
  }

  select(model) {
    this.selected = model;
  }

}
