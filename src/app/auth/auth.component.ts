import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { FirebaseAuth } from 'angularfire2';

@Component({
  selector: 'opcloud-auth',
  template: `
    <div class="auth-container">
      {{ getUserEmail() }}
      
      <div class="log-in-form" [hidden]="!showLogInForm">
        <label>email<input type="email" #email/></label>
        <label>password<input type="password" #pass/></label>
        <button (click)="logIn(email.value, pass.value)">Log In</button>
      </div>
          <div *ngIf="auth | async"><a href="#" (click)="logout()">Log out</a> </div>
          <div *ngIf="!(auth | async)"><a href="#" (click)="toggleLogInForm()">Please log in</a></div>
    </div>
  `,
  styles: [`
.auth-container {position: fixed; z-index: 1; right: 0; top: 0; padding: 10px; background: lightskyblue}`]
})
export class AuthComponent implements OnInit {
  showLogInForm: boolean = false;
  auth;

  constructor(private authService: AuthService) {
    this.auth = authService.auth;
  }

  ngOnInit() {
  }

  toggleLogInForm() {
    this.showLogInForm = !this.showLogInForm;
  }

  logIn(email, password) {
    this.authService.login(email, password);
    this.showLogInForm = false;
  }

  logout() {
    this.authService.logout();
  }

  getUserEmail() {
    const user = this.authService.getUser();
    return user ? user.auth.email : '';
  }
}
