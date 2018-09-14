import { Injectable } from '@angular/core';
import { HttpEvent, HttpHeaders, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CacheService } from '../services/cache/cache.service';
import { of, BehaviorSubject } from 'rxjs';
import { BASE_URL } from '../constants/constants';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log('In cache interceptor');
    console.log(req.url);
    if (req.url == BASE_URL+'auth-token/'){
      return next.handle(req);
    }
    const cachedResponse = this.cache.get(req);
    console.log(cachedResponse);
    return cachedResponse ? cachedResponse as Observable<HttpResponse<any>> : this.sendRequest(req, next, this.cache);
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: CacheService): Observable<HttpEvent<any>> {
    console.log('In CacheIntercept->sendRequest');
    console.log('req = ', req);

    // const noHeaderReq = req.clone({ headers: new HttpHeaders() });
    return next.handle(req)
    .pipe(
      tap(event => {
        console.log('event ',event);

        if (event instanceof HttpResponse) {
          cache.put(req, event); 
          console.log('cache ',cache);
        }
      })
    );
  }
}
// localStorage.setItem('user', JSON.stringify({token:'eyJhbGciOiJIUzI1NiJ9.aG9tZVdvcms.QzgjzNpRyKaSH_xy0uwG7Bg1kdaZYLgci7nsdb0Lk4g', expires_date:2536850095587}))