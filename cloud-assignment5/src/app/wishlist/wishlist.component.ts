import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  displayedColumns: string[] = ['title', 'year', 'genre', 'wishlist'];
  title = 'WishList';
  newSubscription$: Subscription | undefined;
  userId: any = '';
  filterData: any = [];
  wishlist: any = [];
  constructor(
    private dbService: DbserviceService,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    this.dbService.getWishList(this.userId).subscribe((res) => {
      this.wishlist = [];
      if (res) {
        const newWishlist: any = [];
        Object.values(res).forEach((x) => newWishlist.push(x));
        this.wishlist = newWishlist;
        this.filterData = [...this.wishlist];
      } else {
        this.wishlist = [];
      }
    });
  }

  removeFromWishlist(mov: any) {
    this.wishlist = this.wishlist.filter((x: any) => x.id != mov.id);
    this.dbService.setWishlist(this.userId, this.wishlist);
  }

  search(event: any) {
    const term = event.target.value;
    if (!term) {
      this.filterData = this.wishlist;
    } else {
      this.filterData = this.wishlist.filter((x: any) =>
        JSON.stringify(x)
          .trim()
          .toLowerCase()
          .includes(term.trim().toLowerCase())
      );
    }
  }
}
