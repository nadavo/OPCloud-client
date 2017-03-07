import { Component, OnInit, Optional } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'app-choose-link-dialog',
  template: `
    <div>
      <p>
        Source type: {{ linkSource.attributes.type }}
      </p>
      <p>
        Target type: {{ linkTarget.attributes.type }}
      </p>
      <p><label>Choose the link type</label></p>
      <ul>
        <li *ngFor="let link of opmLinks" 
            (click)="select(link)" 
            [ngClass]="link === selected ? 'selected' : ''">{{ link.name }}</li>
      </ul>
      
      <p> 
      <button md-button (click)="dialogRef.close(selected)">SAVE</button> 
      <button md-button (click)="dialogRef.close()">CANCEL</button> 
    </p>
    </div>
  `,
  styleUrls: ['./choose-link-dialog.component.css']
})
export class ChooseLinkDialogComponent implements OnInit {
  public newLink: any;
  public linkSource: any;
  public linkTarget: any;
  private opmLinks = opmLinks;
  private selected: any;

  constructor(
    @Optional() public dialogRef: MdDialogRef<ChooseLinkDialogComponent>
  ) { }

  ngOnInit() {
  }

  select(link) {
    this.selected = link;
  }

}


const opmLinks = [
  {name: 'consumption'},
  {name: 'creation'},
  {name: 'effect'},
];
