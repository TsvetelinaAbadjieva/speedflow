import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse, HttpEvent} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { BASE_URL } from '../../constants/constants';

@Injectable({providedIn: 'root'})

export class LoginService {

    constructor(private http:HttpClient, private router: Router){}

    get(){

    }

    login(data: any, _this:Object) {

       const url = BASE_URL+'/api/auth-token/';
       return this.http.post<any>(url, data)
    }

    logout(){
        if(localStorage.getItem('user')){
            localStorage.removeItem('user');
            this.router.navigate(['/']);
        }
    }
}