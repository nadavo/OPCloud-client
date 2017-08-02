import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'opc-main',
  template: `
    <opc-header></opc-header>

    <a class="sd-tree-menu-icon" (click)="toggleSidenav()">
      <i class="material-icons app-toolbar-menu-icon">{{ sdTreeOpen ? 'chevron_left' : 'menu' }}</i>
    </a>

    <md-sidenav-container class="opcloud-container">

      <md-sidenav #sidenav class="sd-tree-menu"
                  [opened]="sdTreeOpen"
                  mode="side"
                  [opcResizable]="'horizontal'"
                  (opcResize)="onResize($event)">
        <md-list>
          <md-list-item>
            <h4 md-line>SD</h4>
          </md-list-item>
        </md-list>
      </md-sidenav>

      <div class="sd-content">
        <!--<opc-paper></opc-paper>-->
        <div class="main-content"></div>
        <opc-opl-container></opc-opl-container>

      </div>

    </md-sidenav-container>
  `,
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  @ViewChild('sidenav') sidenav;
  sdTreeOpen = true;

  constructor() {
  }

  ngOnInit() {
  }

  toggleSidenav() {
    this.sdTreeOpen = !this.sdTreeOpen;
    this.sdTreeOpen ? this.closeSidenav() : this.openSidenav();
  }

  openSidenav() {
    this.sidenav.open();
  }

  closeSidenav() {
    this.sidenav.close();
  }

  // TODO: replace with onResize method
  onResize(e) {
    console.log(e);
  }
}
