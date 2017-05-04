import { AuthProviders, AuthMethods } from 'angularfire2';
export const firebaseConfig = {
  apiKey: "AIzaSyDCcM4LU4GtKEAUtpW-xjfL1Vq9G8K0J2w",
  authDomain: "opcloud-client.firebaseapp.com",
  databaseURL: "https://opcloud-client.firebaseio.com",
  projectId: "opcloud-client",
  storageBucket: "opcloud-client.appspot.com",
  messagingSenderId: "926349859368"
};


export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
