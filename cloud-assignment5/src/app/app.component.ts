import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'MOVIES';
  loggedInUser: string | undefined;
  userId: string | undefined;
  newSubscription$: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.newSubscription$ = this.authService.username$.subscribe(
      (username: string) => {
        this.loggedInUser = username;
      }
    );
    this.userId = this.authService.getter();
  }

  goToWishlist() {
    this.router.navigate(['/wishlist']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  logout() {
    this.authService.logout();
    
  }

  /**
   * ngOnDestroy life cycle hook
   */
  ngOnDestroy(): void {
    if (this.newSubscription$) {
      this.newSubscription$.unsubscribe();
    }
  }
}
