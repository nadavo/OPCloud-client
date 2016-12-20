import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders } from 'angularfire2/index';

@Injectable()
export class AuthService {
  user;
  pending = true;
  email;
  password;

  constructor(private af: AngularFire) {
    af.auth.subscribe(user => {
      this.pending = false;
      if(user) {
        // user logged in
        this.user = user;
      }
      else {
        // user not logged in
        this.user = null;
        this.login(this.email, this.password);
      }
    });
  }


  login(email, password) {
    this.af.auth.login({ email, password })
  }

  logout() {
    this.af.auth.logout();
  }

  isAuthenticated() {
    return !!this.user;
  }

}
