import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse, HttpEvent} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_URL, EXPIRE_TOKEN } from '../../constants/constants';
import { AuthService } from '../auth/auth.service';
import { LoginComponent } from '../../components/login/login.component';

@Injectable({providedIn: 'root'})

export class LoginService {

    constructor(private http:HttpClient, private router: Router, private auth: AuthService){}

    login(data: any, _this:LoginComponent) {

       const url = BASE_URL+'auth-token/';
       console.log('Enter in LOGIN service', {data:data, url:url})
       return this.http.post<any>(url, data).subscribe(
           user => {
               console.log('Inrequest Login user ', user);
                if(user && user.token) {
                        this.auth.setToken(user.token);
                        this.router.navigate(['user-data']);
                        console.log('LOGIN user ', user);
                    
                } else{
                    _this.errorMsg = 'Invalid credentials';
                     this.router.navigate(['/'])
                }
           },
           (error) => {
               console.log(error);
               _this.errorMsg = 'Invalid credentials';
               throwError(error)
            }
        )
       
    }

    logout(){
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
            this.router.navigate(['/']);
        }
    }
}