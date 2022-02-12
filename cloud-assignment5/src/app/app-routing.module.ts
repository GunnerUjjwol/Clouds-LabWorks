import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListmoviesComponent } from './listmovies/listmovies.component';
import { SigninComponent } from './signin/signin.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  { path: 'login', component: SigninComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: '', component: ListmoviesComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
