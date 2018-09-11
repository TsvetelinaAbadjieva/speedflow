import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { startWith, tap}   from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BASE_URL, EXPIRE_TOKEN} from '../constants/constants';
import { Router, Route} from '@angular/router';


@Injectable()
export class JWTInterceptor implements HttpInterceptor{
    
    constructor(private router: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

        console.log('In interceptor');
        console.log(req.url);
        console.log(localStorage.getItem('user'))
        console.log('req.headers.token = ',req.headers.get('token'));

        let reqCloned = null;

        if(req.url == BASE_URL+'/api/auth-token/'){
            console.log('Headers0:  ', req.headers);
            return next.handle(req);
        }
        
        if(req.url !== BASE_URL+'/api/auth-token/' ){

            let userStr = localStorage.getItem('user');
            let user = userStr ? JSON.parse(userStr) : null;
            let token = user ? user.token : '';
            reqCloned = req.clone({
                setHeaders: {
                    "Authorization": "Token "+ token,
                    "Content-Type" : "application/json"
                }
            });        
                if(!user){
                this.router.navigate(['/']);
                return next.handle(reqCloned);
            }
            if (user && (Date.now() - Date.parse(user.expires_date))> EXPIRE_TOKEN){
                localStorage.removeItem('user');
                this.router.navigate(['/']);
                return next.handle(reqCloned);
            }
                console.log('Headers1:  ', reqCloned.headers.get('token'));
                return next.handle(reqCloned);
            
        } 

            
    }
}