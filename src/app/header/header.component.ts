import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'opcloud-header',
  template: `
    <div class="app-header">
      <div class="app-title">
        <h1>OPCloud Demo</h1>
        <h2>made with <a href="http://www.jointjs.com/rappid/tour" target="_blank" style="color:#383b61">Rappid 2</a></h2>
      </div>
      <opcloud-rappid-toolbar></opcloud-rappid-toolbar>
    </div>
  `,
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
