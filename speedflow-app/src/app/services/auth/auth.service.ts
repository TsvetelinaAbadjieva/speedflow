import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { BASE_URL, EXPIRE_TOKEN } from '../../constants/constants';

@Injectable()
export class AuthService {

  constructor() { }

  getAuthenticationToken(req: HttpRequest<any>) {
    if (req.url == BASE_URL + 'auth-token/') {
      return null;
    } else {
      let token = JSON.parse(localStorage.getItem('user')).token;
      let expires_date = JSON.parse(localStorage.getItem('user')).expires_date;
      if (token && (Date.now() - EXPIRE_TOKEN) > Date.parse(expires_date)) {
        localStorage.removeItem('user');
        return null;
      } else {
        return token;
      }
    }
  }

  checkAuthorization(req: HttpRequest<any>) {
    let auth = req.headers.get('Authorization');
    if (auth != undefined || auth != null) {
      let token = auth.split(' ')[1];
      if(!token) {
        return false;
      }
      let reqCloned = req.clone({setHeaders:{"Authorization": "Bearer "+token}})
      // This to be uncommented if BASE_URL = 'https://dev.adcharge.eu/api/' is used
      // let reqCloned = req.clone({setHeaders:{"Authorization": "Token "+token}})
      return reqCloned;
    }
    return false;
  }

  setToken(token) {
    let user = { token: token, expires_date: Date.now() + EXPIRE_TOKEN }
    console.log('In auth.setToken', user);
    localStorage.setItem('user', JSON.stringify(user));
  }
} 
