import { Component, OnInit, Input } from '@angular/core';
import { GraphService } from '../rappid-components/services/graph.service';
import { linkTypeSelection } from '../link-operating/linkTypeSelection';



@Component({
  selector: 'opcloud-opl-widget',
  template: `
    <div class="opl-container">
      <p *ngFor="let sentence of getOpl()" [innerHTML]="sentence">
      
      </p>
    </div>
  `,
  styleUrls: ['./opl-widget.component.css']
})
export class OplWidgetComponent implements OnInit {
  private graph;
  private sentence;
  private objectName;
  private processName;

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
          if(!cell.attributes.name) return;

          const source = cell.getSourceElement();
          const target = cell.getTargetElement();

          if (!source || !target) return;

          this.sentence=linkTypeSelection.generateOPL(source, target, cell.attributes.name);

          return this.sentence;


        case 'opm.Object':
          this.objectName=cell.attributes.attrs.text.text;

          return `<b class="object">${this.objectName}</b> <span>is an object</span><b>.</b>`;


        case 'opm.Process':
          this.processName=cell.attributes.attrs.text.text;
          return `<b class="process" >${this.processName}</b> is a process<b>.</b>`;


      }

    });
  }




}
