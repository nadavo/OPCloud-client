import { Component, OnInit } from '@angular/core';
import { GraphService } from '../../../rappid-components/services/graph.service';
import { InitRappidService } from '../../../rappid-components/services/init-rappid.service';

@Component({
  selector: 'opc-header',
  template: `
    <div class="app-toolbar-container">
      <md-toolbar class="app-toolbar mat-elevation-z6" color="primary">

        <a>
          <img src="../../../../assets/OPCloud.jpg" class="logo">
          <span class="app-toolbar-title">{{ title }}</span>
        </a>

        <opcloud-rappid-stencil [graph]="graph"
                                [paper]="paper"
                                [paperScroller]="paperScroller">
        </opcloud-rappid-stencil>

        <span class="app-toolbar-filler"></span>

        <opc-user-status></opc-user-status>

      </md-toolbar>
    </div>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  paperScroller;
  graph;
  paper;
  title = 'OPCloud';

  constructor(graphService: GraphService,
              initRappid: InitRappidService) {
    this.graph = graphService.graph;
    this.paper = initRappid.paper;
    this.paperScroller = initRappid.paperScroller;
  }

  ngOnInit() {
  }

}
