import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { AppComponent } from './app.component';
import {UserDataComponent} from './user/user-data.component';

const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"user-data",
    component: UserDataComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
