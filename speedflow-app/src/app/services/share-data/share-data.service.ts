import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError} from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { switchMap, debounceTime, withLatestFrom, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ShareDataService {

private sharedDataSource : BehaviorSubject<any> = new BehaviorSubject({});
public  sharedObserver = this.sharedDataSource.asObservable();

 endPoints: string[];
 isLoading: boolean;

 constructor(private http: HttpClient) {}

 setEndpoint(endPoint){
   this.endPoints.push(endPoint);
   this.isLoading = true;
 }
 getLastEndpoint(){
  let currentEndPoint = this.endPoints.pop()[0];
  return currentEndPoint;
 }
 setCurrentData(data: any){
   console.log('In setCurrentData -> ', data);
      this.sharedDataSource.next(data);
 }

 loadData(endPoint){
   this.setEndpoint(endPoint);
   let _this = this;

   return new Promise((resolve, reject) => {

     let endPoint = _this.getLastEndpoint();

     _this.http.get(endPoint)
     .toPromise()
     .then(
       res => {
         console.log(res);
         _this.isLoading = false;

         let result = {res: res, isLoading: _this.isLoading}
         _this.setCurrentData(result);
         resolve();
        },
      msg => {
        console.log(msg);
        _this.isLoading = false;

        let result = {res: msg, isLoading: _this.isLoading}
        reject(result);
        }
    )
   })
 }

 loadAsObservable(endPoint){
   this.http.get(endPoint).pipe<any>(
     map( res => {
            if(res){
              this.isLoading = false;
              let result = {
                res: res,
                isLoading: this.isLoading
              }
              return this.setCurrentData(result);
            }
          },
          error => {
            this.isLoading = false;
            let result = {
              res: null,
              isLoading: this.isLoading
            }
            this.setCurrentData(result);
            throwError(error);
          }
    )
  )
 }
}