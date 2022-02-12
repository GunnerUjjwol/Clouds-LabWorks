import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import { DbserviceService } from '../dbservice.service';
import { movie } from '../movie';

@Component({
  selector: 'app-listmovies',
  templateUrl: './listmovies.component.html',
  styleUrls: ['./listmovies.component.css'],
})
export class ListmoviesComponent implements OnInit {
  displayedColumns: string[] = ['title', 'year', 'genre', 'wishlist'];
  title = 'Movies Dashboard';
  userId: any = '';
  movies: any = [];

  filterData: any = [];
  wishlist: any;
  isLoading = true
  constructor(
    private db: AngularFireDatabase,
    private dbService: DbserviceService,
    private spinner: NgxSpinnerService,
    private authService: AuthService,
    private router: Router
  ) {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    if (!this.userId) {
      this.userId = '';
    }
    this.wishlist = [];

    const ref = this.db.list('movies-list');
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
    

    this.dbService.getWishList(this.userId).subscribe(
      (res) => {
        const newWishlist: any = [];
        ref.valueChanges().subscribe((data) => {
          this.movies = data;
          this.filterData = [...this.movies];
          if (res) {
            Object.values(res).forEach((x) => newWishlist.push(x));
            this.wishlist = newWishlist;
            this.filterData = this.movies.filter(
              (x: any) => !this.wishlist.some((y: any) => x.id == y.id)
            );
          } else {
            this.wishlist = [];
          }
        });
      },
      (error) => console.log(error)
    );
  }

  addToWishList(mov: movie) {
    this.spinner.show()
    setTimeout(() => {
      this.spinner.hide()
    },100)
    this.wishlist = [...this.wishlist, mov];
    this.dbService.setWishlist(this.userId, this.wishlist);
  }

  search(event: any) {
    const term = event.target.value;
    if (!term) {
      this.filterData = this.movies;
    } else {
      this.filterData = this.movies.filter((x: any) =>
        JSON.stringify(x)
          .trim()
          .toLowerCase()
          .includes(term.trim().toLowerCase())
      );
    }
  }
}
