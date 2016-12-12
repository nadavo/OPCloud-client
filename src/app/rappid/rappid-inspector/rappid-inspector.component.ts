import { Component, OnInit, ViewContainerRef, ViewChild, Input } from '@angular/core';
import { GraphService } from '../services/graph.service';
import { inspectorConfig } from '../../config/inspector.config';

const joint = require('rappid');
const _ = require('lodash');

@Component({
  selector: 'opcloud-rappid-inspector',
  template: `
    <div class="inspector-container" #inspectorContainer></div>
  `,
  styleUrls: ['./rappid-inspector.component.css']
})
export class RappidInspectorComponent implements OnInit {
  @Input() cell;
  @ViewChild('inspectorContainer', { read: ViewContainerRef }) inspectorContainer;
  private graph;

  constructor(graphService:GraphService) {
    this.graph = graphService.getGraph();
  }

  ngOnInit() {

  }

  ngOnChanges(changes) {
    if (changes.cell.currentValue && this.cell) this.createInspector();
  }

  createInspector() {
    const inspector = new joint.ui.Inspector(_.extend({
      cell: this.cell
    }, inspectorConfig[this.cell.get('type')]));

    this.inspectorContainer.element.nativeElement.appendChild(inspector.el);
    inspector.render();
  }

}
