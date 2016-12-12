import { Component, AfterViewInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { stencilConfig } from '../../config/stencil.config';

const joint = require('rappid');

@Component({
  selector: 'opcloud-rappid-stencil',
  template: `
    <div class="stencil-container" #stencilContainer>
      <!--<div class="joint-theme-modern joint-stencil searchable collapsible">
        <div class="groups-toggle">
          <label class="group-label">Stencil</label>
          <button class="btn btn-expand" title="Expand all" (click)="stencil.openGroups()">+</button>
          <button class="btn btn-collapse" title="Collapse all" (click)="stencil.closeGroups()">-</button>
        </div>-->
        <!--<div class="search-wrap">
          <input type="search" placeholder="search" class="search">
        </div>
        <div class="stencil-paper-drag joint-theme-modern joint-paper" >
        </div>-->
      <!--</div>-->
    </div>
  `,
  styleUrls: ['./rappid-stencil.component.css']
})
export class RappidStencilComponent implements AfterViewInit {
  @Input() graph;
  @Input() paper;
  @Input() paperScroller;

  @ViewChild('stencilContainer', { read: ViewContainerRef }) stencilContainer;
  stencil;
  snaplines;

  constructor() {
  }

  ngOnInit() {
    this.initializeStencil();
  }

  ngAfterViewInit() {
    // this.initStencil();
    this.stencilContainer.element.nativeElement.appendChild(this.stencil.el);
    this.stencil.render().load(stencilConfig.shapes);

    // let shapes = this.opmShapesService.initOpmShapes();
    // this.addShapesToStencil(shapes, 'main');
  }

  // Create and populate stencil.
  initializeStencil() {

    this.snaplines = new joint.ui.Snaplines({ paper: this.paper });

    var stencil = this.stencil = new joint.ui.Stencil({
      paper: this.paperScroller,
      snaplines: this.snaplines,
      scaleClones: true,
      width: 240,
      groups: stencilConfig.groups,
      dropAnimation: true,
      groupsToggleButtons: true,
      search: {
        '*': ['type', 'attrs/text/text', 'attrs/.label/text'],
        'org.Member': ['attrs/.rank/text', 'attrs/.name/text']
      },
      // Use default Grid Layout
      layout: true,
      // Remove tooltip definition from clone
      dragStartClone: function (cell) {
        return cell.clone().removeAttr('./data-tooltip');
      }
    });

    /// $('.stencil-container').append(stencil.el);
    // this.stencil.render().load(stencilConfig.shapes);
  }


}
