import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div id="app" class="joint-theme-modern joint-app">
      <opcloud-header></opcloud-header>
      <opcloud-rappid></opcloud-rappid>
      <div id="block_container">
      <opcloud-opd-hierarchy id="opd-block"></opcloud-opd-hierarchy>
      <opcloud-opl-widget id="opl-block"></opcloud-opl-widget>
      </div>
    </div>
    <opcloud-auth></opcloud-auth>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor() {

  }
}
//<opcloud-opl-widget></opcloud-opl-widget>
