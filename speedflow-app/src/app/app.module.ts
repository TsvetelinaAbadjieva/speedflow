import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { MatInputModule} from '@angular/material/input';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JWTInterceptor } from './interceptors/jwt-interceptor';
import { CacheService } from './services/cache/cache.service';
import { CachingInterceptor } from './interceptors/caching-interceptor';
// import { HeadersInterceptorService } from './services/headers-interceptor.service';
import {LoginService} from './services/login/login.service';
import { BASE_URL, EXPIRE_TOKEN} from './constants/constants';
import { UserDataComponent } from './user/user-data.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [

     LoginService,
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

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
