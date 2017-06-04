import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'opcloud-rappid-opl',
  template: `
    <div class="opl-container">
      <p *ngFor="let cell of graph.getCells()" [innerHTML]="cell.attributes.opl" 
      (mouseover)="highlightCell(cell)"
      (mouseleave)="unhighlightCell(cell)">
      </p>
    </div>
  `,
  styleUrls: ['./rappid-opl.component.css']
})
export class RappidOplComponent implements OnInit {
  @Input() graph;
  @Input() paper;

  constructor() {
  }

  ngOnInit() {

  }

  highlightObject(cell){
    var cellView = this.paper.findViewByModel(cell);
    cellView.model.attr('rect/fill','#FF0000')

  }
  unhighlightObject(cell){
    var cellView = this.paper.findViewByModel(cell);
    cellView.model.attr('rect/fill','#DCDCDC')

  }

  highlightProcess(cell){
    var cellView = this.paper.findViewByModel(cell);
    cellView.model.attr('ellipse/fill','#FF0000')
  }

  unhighlightProcess(cell){
    var cellView = this.paper.findViewByModel(cell);
    cellView.model.attr('ellipse/fill','#DCDCDC')
  }

  highlightLink(cell){
    var cellView = this.paper.findViewByModel(cell);
    cellView.model.attr('.connection/stroke','#FF0000');
    var source=cell.getSourceElement();
    var target=cell.getTargetElement();
    if(source.attributes.type==='opm.Object') this.highlightObject(source);
    else if(source.attributes.type==='opm.Process') this.highlightProcess(source);
    if(target.attributes.type==='opm.Object') this.highlightObject(target);
    else if(target.attributes.type==='opm.Process') this.highlightProcess(target);
  }
  unhighlightLink(cell){
    var cellView = this.paper.findViewByModel(cell);
    cellView.model.removeAttr('.connection/stroke');
    var source=cell.getSourceElement();
    var target=cell.getTargetElement();
    if(source.attributes.type==='opm.Object') this.unhighlightObject(source);
    else if(source.attributes.type==='opm.Process') this.unhighlightProcess(source);
    if(target.attributes.type==='opm.Object') this.unhighlightObject(target);
    else if(target.attributes.type==='opm.Process') this.unhighlightProcess(target);
  }


  highlightCell(cell){
    switch(cell.attributes.type) {
      case 'opm.Object': this.highlightObject(cell);
      case 'opm.Process': this.highlightProcess(cell);
      case 'opm.Link': this.highlightLink(cell);
    }

  }

  unhighlightCell(cell){
    switch(cell.attributes.type) {
      case 'opm.Object': this.unhighlightObject(cell);
      case 'opm.Process': this.unhighlightProcess(cell);
      case 'opm.Link': this.unhighlightLink(cell);
    }

  }

}
