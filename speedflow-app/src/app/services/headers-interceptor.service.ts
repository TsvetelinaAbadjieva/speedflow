
import { Injectable } from '@angular/core';
import {
    HttpEvent, 
    HttpInterceptor, 
    HttpHandler, 
    HttpRequest,
    HttpResponse 
  } from '@angular/common/http';
  import {Observable, throwError} from 'rxjs';
  import { catchError,tap} from 'rxjs/operators';

  
const BASE_URL = 'https://dev.adcharge.eu';

@Injectable()
export class HeadersInterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const reqCloned = req.clone({
      setHeaders:{
        "pragma": "no-cache",
        "Cookie": "_ga=GA1.2.117847961.1527883491; csrftoken=kT2ylYW05Qm1vUd4kRa7Z7fGPSGFyLi6",
        "origin": BASE_URL,
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,ru-RU;q=0.8,ru;q=0.7",
        "accept": "application/json, text/plain, */*",
        "cache-control": "no-cache",
        "authority": "dev.adcharge.eu",
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Methods": "POST, PUT, DELETE, GET",
        "Access-Control-Allow-Origin": BASE_URL      
      }
    });

    if(req.url != BASE_URL+'/api/auth-token/'){
      reqCloned.headers.set('Authorization', 'Token '+localStorage.getItem('token'));
    } else if(req.url == BASE_URL+'/api/auth-token/' && reqCloned.headers.get('token')){
      localStorage.setItem('token', reqCloned.headers.get('token'));
    }


    return next.handle(reqCloned)
                // .pipe(
                //   tap(event => {
                //         if (event instanceof HttpResponse){
                //             console.log('Request seems OK');
                //             console.log(event.status)
                //         }
                //       },
                //       (error) => throwError(error)
                //   )
                // );
  }
}
