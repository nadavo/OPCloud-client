import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: `
    <div id="app" class="joint-theme-modern joint-app">
      <opcloud-header></opcloud-header>
      <opcloud-rappid></opcloud-rappid>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
