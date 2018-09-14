import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { BASE_URL, EXPIRE_TOKEN } from '../constants/constants';
import { Router, Route } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';


@Injectable()
export class JWTInterceptor implements HttpInterceptor {

    constructor(private router: Router, private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('In interceptor');
        console.log(req.url);
        console.log(localStorage.getItem('user'))
        console.log('req.headers.token = ', req.headers.get('token'));

        let reqCloned = null;

        if (req.url == BASE_URL + 'auth-token/') {

            reqCloned = req.clone({
                setHeaders: {
                    // "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json;charset=UTF-8",
                },
                // url: req.url.replace('http','https')
            });
            console.log('ReqURL:  ', reqCloned.headers);
            return next.handle(reqCloned);
        }

        else if (req.url != BASE_URL + 'auth-token/') {
            let token = this.auth.getAuthenticationToken(req);
            console.log('In ui/Userdata -> ',token)
            if (!token) {
                this.router.navigate(['/']);
                return next.handle(req);
            }
            reqCloned = req.clone({
                setHeaders: {
                    "Authorization": "Token " + token,
                    "Content-Type": "application/json;charset=UTF-8"
                },
            });
            return next.handle(reqCloned);
        }
    }
}