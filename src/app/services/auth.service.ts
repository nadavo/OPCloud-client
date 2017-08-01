import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthService {
  user;
  pending = true;
  auth;

  constructor(public af: AngularFireAuth) {
    this.auth = af.authState;
    af.authState.subscribe(user => {
      this.pending = false;
      if (user) {
        // user logged in
        this.user = user;
      } else {
        // user not logged in
        this.user = null;
      }
    });
  }


  login(email, password) {
    this.af.auth.signInWithEmailAndPassword(email, password)
  }

  logout() {
    this.af.auth.signOut();
  }

  isAuthenticated() {
    return !!this.user;
  }

  getUser() {
    return this.user;
  }

}
