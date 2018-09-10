import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest, HttpResponse, HttpEvent} from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
// import  {of} from 'rxjs';
import  {map} from 'rxjs/operators';
import {tap, share} from 'rxjs/operators';

export class ApiService {
data: any;
observable: Observable<any>;
  
constructor(private http: HttpClient) { }

  get(url){

    if(this.data){
      return  new Observable(this.data);
    } else if (this.observable){
      return this.observable;
    } else {
      this.observable = this.http.get(url, {observe: 'response'})
      .pipe(
        tap(
            (response) => {
            this.observable = null;
            if(response.status == 400){
              return 'Request failed'
            }
            if (response.status == 200){
              this.data = response.body;
              return this.data;
            }
          }
        )
      );
      share();
      return this.observable;
    }
  }

  post(url, data){
    this.http.post(url, data, {observe: 'response'}).pipe(
      tap(
        (response) => {
          console.log('in post func')
          let status = (response.status == 200)?  'Operation successful, status 200': 'Invalid operation status 400';
          let data = {
            status: status,
            data: response.body
          };
        },
        (error)    => throwError(error)
      )
    )
  }

}
