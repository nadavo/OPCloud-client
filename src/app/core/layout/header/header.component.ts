import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'opc-header',
  template: `
    <div class="app-toolbar-container">
      <md-toolbar class="app-toolbar mat-elevation-z6" color="primary">

        <a>
          <img src="../../../../assets/OPCloud.jpg" class="logo">
          <span class="app-toolbar-title">{{ title }}</span>
        </a>

        <!--<opc-stencil></opc-stencil>-->

        <span class="app-toolbar-filler"></span>

        <opc-user-status></opc-user-status>

      </md-toolbar>
    </div>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  title = 'OPCloud';

  constructor() {
  }

  ngOnInit() {
  }

}
