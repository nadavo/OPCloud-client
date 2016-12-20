import { AuthProviders, AuthMethods } from 'angularfire2';
export const firebaseConfig = {
  apiKey: 'AIzaSyCBmb2a2S_idcwqz4zwnkgG1TIgh9M8y-M',
  authDomain: 'opcloud-f8fef.firebaseapp.com',
  databaseURL: 'https://opcloud-f8fef.firebaseio.com',
  storageBucket: 'opcloud-f8fef.appspot.com'
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
