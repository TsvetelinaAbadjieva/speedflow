import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent} from './components/login/login.component';
import { UserDataDashboardComponent} from './components/user-data-dashboard/user-data-dashboard.component';
import { ProfileComponent} from './components/profile/profile.component'
const routes: Routes = [
  {
    path:"",
    component: LoginComponent
  },
  {
    path:"user-data",
    // component: ProfileComponent
    component: UserDataDashboardComponent

  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
