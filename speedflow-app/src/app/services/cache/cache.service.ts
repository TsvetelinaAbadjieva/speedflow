import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse} from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { AuthService } from '../auth/auth.service';

const maxAge= 30000;
@Injectable()
export class CacheService {

  cache = new Map();
  /**
   * cache entry structure:
   * cache = {
   * url: url,
   * response: HttpResponse<any>,
   * lastRead: Date.now()
   * }
   */
  constructor(private auth: AuthService) { }

  get(req: HttpRequest<any>): Observable<HttpResponse<any>> | undefined {
    let token = this.auth.getAuthenticationToken(req);
    if (!token){
      return undefined;
    }
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    console.log('GET From cache = ', cached);
    if(!cached){
      return undefined;
    }
    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired' : '';
    console.log('Is Expired-> ', isExpired);
    if(isExpired){
      return undefined;
    }
    return cached.response;

  }
  put(req: HttpRequest<any>, response: HttpResponse<any>): void{

    let token = this.auth.getAuthenticationToken(req);
    if (!token){
      return;
    }
    const url = req.url;
    const entry = {url, response, lastRead: Date.now() };
    this.cache.set(url, entry);
    console.log('Cache after PUT - ', this.cache);
    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired){
        this.cache.delete(expiredEntry.url);
      }
    });
  }

  clear(){
    this.cache.clear;
  }
}
