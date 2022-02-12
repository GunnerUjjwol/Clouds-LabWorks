import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { User } from 'firebase'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  username$ = new BehaviorSubject<string>('');
  user: any;
  private userId: string = '';

  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private router: Router
    ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
        localStorage.setItem('userName', this.user.displayName);
        localStorage.setItem('userId', this.user.uid);
        this.username$.next(this.user.displayName);
        
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
      }
    });
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider);
  }

  /**
   * checks whether user is logged in or not
   */
  isUserLoggedIn() {
    const userName: any = localStorage.getItem('userName');

    this.username$.next(userName);
    return !!userName;
  }

  /**
   * handles the logout request
   */
  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('userId');
      this.username$.next('');
      this.router.navigate(['/login']);
    })

  }

  setter(userId: string) {
    this.userId = userId;
  }

  getter() {
    return this.userId;
  }
}
