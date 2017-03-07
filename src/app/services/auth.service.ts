import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth } from 'angularfire2';

@Injectable()
export class AuthService {
  user;
  pending = true;

  constructor(private af: AngularFire, public auth: AngularFireAuth) {
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
