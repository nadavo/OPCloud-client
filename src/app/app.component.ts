import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `
    <div id="app" class="joint-theme-modern joint-app">
      <opcloud-header></opcloud-header>
      <opcloud-rappid></opcloud-rappid>
      <opcloud-opl-widget></opcloud-opl-widget>
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
