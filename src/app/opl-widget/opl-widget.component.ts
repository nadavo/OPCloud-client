import { Component, OnInit } from '@angular/core';
import { GraphService } from '../rappid-components/services/graph.service';
import {linkTypeSelection} from '../link-operating/linkTypeSelection';

@Component({
  selector: 'opcloud-opl-widget',
  template: `
    <div class="opl-container">
      <p *ngFor="let sentence of getOpl()">{{ sentence }}</p>
    </div>
  `,
  styleUrls: ['./opl-widget.component.css']
})
export class OplWidgetComponent implements OnInit {
  private graph;
  private sentence;
  private thingName;

  constructor(private graphService: GraphService) {
    this.graph = graphService.getGraph();
  }

  ngOnInit() {
  }

  getOpl() {
    return this.graph.getCells().map((cell) => {
      switch (cell.attributes.type) {
        // TODO: add cases
        case 'opm.Link':
          const source = cell.getSourceElement();
          const target = cell.getTargetElement();
          if (!source || !target) return;
          this.sentence = linkTypeSelection.generateOPL(source, target, cell.attributes.name);
          return this.sentence;
        case 'opm.Object':
          this.thingName = cell.attributes.attrs.text.text;
          return `${this.thingName} is an object`;
        case 'opm.Process':
          this.thingName = cell.attributes.attrs.text.text;
          return `${this.thingName} is a process`;
      }
    });
  }


}
