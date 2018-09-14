import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './interceptors/jwt-interceptor';
import { CacheService } from './services/cache/cache.service';
import { CachingInterceptor } from './interceptors/caching-interceptor';
// import { HeadersInterceptorService } from './services/headers-interceptor.service';
import { LoginService} from './services/login/login.service';
import { BASE_URL, EXPIRE_TOKEN} from './constants/constants';
import { ProfileComponent } from './components/profile/profile.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { StatusComponent } from './components/status/status.component';
import { UserDataDashboardComponent } from './components/user-data-dashboard/user-data-dashboard.component';
import { MatGridListModule, MatMenuModule, MatIconModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
import { PaymentsTableComponent } from './components/payments-table/payments-table.component';
import { AuthService } from './services/auth/auth.service';
import { ShareDataService } from './services/share-data/share-data.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    UserDetailsComponent,
    StatusComponent,
    UserDataDashboardComponent,
    PaymentsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    LayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [

     LoginService,
     AuthService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: JWTInterceptor, 
      multi:true
    }, 
    CacheService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: CachingInterceptor, 
      multi:true
    },  
    ShareDataService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
