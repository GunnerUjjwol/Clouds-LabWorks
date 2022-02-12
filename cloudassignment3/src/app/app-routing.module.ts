import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListusersComponent } from './components/listusers/listusers.component';
import { UserformComponent } from './components/userform/userform.component';

const routes: Routes = [
  { path: 'form', component: UserformComponent },
  { path: '', component: ListusersComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
