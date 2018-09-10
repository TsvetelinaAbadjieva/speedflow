import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';
// import { of } from 'rxjs';
import { startWith, tap}   from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestCacheService } from '../services/request-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {

  constructor(private cache: RequestCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const cachedResponse = this.cache.get(req);//todo get
    return cachedResponse ? new Observable() : this.sendRequest(req, next, this.cache); 
  }

  sendRequest(req: HttpRequest<any>, next: HttpHandler, cache: RequestCacheService): Observable<HttpEvent<any>>{
    return next.handle(req).pipe(
        tap((event) => { if (event instanceof HttpResponse){
                cache.put(req, event);
                //to do put
                }
            }
        )
    );
  }
}
