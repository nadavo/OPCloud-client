import {Component, EventEmitter, Input, ViewChild} from '@angular/core';


@Component({
  selector: 'dlg',
  templateUrl: './Dialog.component.html',
  styleUrls: ['./Dialog.component.css']
})
export class DialogComponent {

  close = new EventEmitter();
  public newLink: any;
  public linkSource: any;
  public linkTarget: any;
  public opmLinks : Array<any>;
  private selected: any;

  onClickedExit(link) {
    this.close.emit('event');
    this.selected = link;
    console.log(this.selected);
  }
  select(link) {
    this.selected = link;

  }
  constructor(){
  }

}
