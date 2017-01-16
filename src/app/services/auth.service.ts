import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, FirebaseAuth } from 'angularfire2/index';

@Injectable()
export class AuthService {
  user;
  pending = true;

  constructor(private af: AngularFire, public auth: FirebaseAuth) {
    af.auth.subscribe(user => {
      this.pending = false;
      if(user) {
        // user logged in
        this.user = user;
      }
      else {
        // user not logged in
        this.user = null;
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

  getUser() {
    return this.user;
  }

}
