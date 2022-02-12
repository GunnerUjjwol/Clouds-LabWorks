import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  constructor(public authService: AuthService, private router: Router) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {}

  googleLogin() {
    this.authService
      .GoogleAuth()
      .then((result) => {
        const res: any = result;
        console.log('You have been successfully logged in!');
        localStorage.setItem('userName', res.user.displayName);
        localStorage.setItem('userId', res.user.uid);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.authService.username$.next(res.user.displayName);
        this.authService.setter(result.user ? result.user.uid : '');
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
