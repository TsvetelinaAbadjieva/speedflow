import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { ControlRequestService } from '../services/requests/control-request.service';

@Injectable()
export class ControlRequestInterceptor implements HttpInterceptor {

    constructor(private controlReq: ControlRequestService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {

        if (req.method == 'POST' || req.method == 'PUT' || req.method == 'DELETE') {
            return next.handle(req);
            
        } else {
            let control =  this.controlReq.checkRequest(req);
            if(control){ return next.handle(req);
            } else {
                console.log('REQUEST CANCELED');
            }
        }
    }

}
// localStorage.setItem('user', JSON.stringify({token:'eyJhbGciOiJIUzI1NiJ9.aG9tZVdvcms.QzgjzNpRyKaSH_xy0uwG7Bg1kdaZYLgci7nsdb0Lk4g', expires_date:2536850095587}))