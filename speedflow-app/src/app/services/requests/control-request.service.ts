import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RequestModel {
  url: string;
  created_at: number;
}
const EXPIRATION_REQ = 3000;

@Injectable({
  providedIn: 'root'
})

export class ControlRequestService {
  allRequests: any[] = [];
  request: any = {};
  constructor() { }

  checkRequest(req: HttpRequest<any>) {
    this.clearOldRequests();
    let thisRequest = {
      url: req.url,
      created_at: Date.now()
    };
    console.log('allReq', this.allRequests);
    let startedReq = this.allRequests.filter((currentReq) => {
      console.log('Filter current requests... ', currentReq)
      return (currentReq.url == req.url && this.isActivatedRequest(currentReq)) ? currentReq : null;
    });
    console.log('StartedReq', startedReq);
      if (this.allRequests.length == 0) {
        this.allRequests.push(thisRequest);
        return req;
      }
      else if (startedReq.length == 0 ) {
        
        this.allRequests.push(thisRequest);
        console.log('AllRequests In CheckRequest', this.allRequests);
        console.log('Current req = ', req);
        return req;

      } else  {
        return null;
      }
  }

  clearOldRequests() {
    console.log('AllRequests Before clear', this.allRequests);
    if (this.allRequests.length == 0) return;

    this.allRequests = this.allRequests.filter(request => {
      if (Date.now() - request.created_at < EXPIRATION_REQ)
        return request;
    });
    console.log('AllRequestsAfter clear', this.allRequests);
  }
  isActivatedRequest(req: RequestModel) {
    return Date.now() - req.created_at < EXPIRATION_REQ ? true : false;
  }
}
