import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { tap,}   from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CacheService } from '../services/cache/cache.service';
import { of, BehaviorSubject } from 'rxjs';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: CacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('In cache interceptor');
    console.log(req.url);
    const cachedResponse = this.cache.get(req);
    console.log(cachedResponse);
    return cachedResponse ? cachedResponse : this.sendRequest(req, next, this.cache); 
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: CacheService): Observable<HttpEvent<any>>{
    console.log('In CacheIntercept->sendRequest');
    return next.handle(req).pipe(
        tap((event) => { 
          if (event instanceof HttpResponse){
              cache.put(req, event);
              console.log('cache -->', cache);
          }
        })
    );
  }
}
