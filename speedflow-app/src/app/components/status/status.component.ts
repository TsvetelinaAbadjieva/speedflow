import { Component, OnInit } from '@angular/core';
import { BASE_URL } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { debounceTime, share, shareReplay } from 'rxjs/operators';
import { CacheService } from '../../services/cache/cache.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {

  status: any = {};
  statuses: any[] = [];
  endPointStauses = BASE_URL + 'ui/userdata/';
  dataHasLoaded: boolean = false;
  reqStarted: boolean = false;
  counter: number = 0;

  constructor(private http: HttpClient,
    private sharedService: ShareDataService,
    private cache: CacheService
  ) { }

  ngOnInit() {
    console.log('In ONINIT StatusComponent');
    this.statuses = [];
    this.dataHasLoaded = false;
    this.loadData();
  }

  loadData() {
    this.reqStarted = true;
    this.http.get<any>(this.endPointStauses)
      .pipe(
        debounceTime(300),
        shareReplay()
      )
      // .toPromise().then(
        .subscribe(
        result => {
          console.log('REQUEST PASSED Load Status data... -> ', result);
          this.reqStarted = false;
          this.dataHasLoaded = true;
          this.status = {};
          this.statuses = [];
          // let res = result.data;
          let res = result;

          this.status = {
            is_active: res.is_active,
            debet: res.debet,
            credit_limit: res.credit_limit,
            notification_threshold: res.notification_threshold,
            last_login: res.last_login,
            currency: res.currency,
            username: res.username,
            avatar: res.avatar,
            first_name: res.first_name,
            last_name: res.last_name,
            email: res.email,
            birthday: res.birthday
          }
          //{"id":42449,"name":"homeWork","debet":"0.00000","credit_limit":"100.00000","notification_threshold":"20.00000","last_login":"2018-09-21T09:03:43.672838Z","is_superuser":false,"username":"homeWork","first_name":"Kalina","last_name":"Ivanova","email":"jurasikasan@speedflow.com","is_active":true,"date_joined":"2018-06-28T15:34:47.451465Z","birthday":"1989-01-01","currency":"$","currency_name":"usd","avatar":null,"is_operator":false,"is_provider":true,"is_cpa":false,"cpa_parameters":null,"cpa_redirect":"http(s)://offerurl.com/?offer_id={offer_id}&","cpa_postback":"http://dev.adcharge.eu/api/cpa/response/?sid={click_id}","paypal_payments":true,"borica_payments":true,"ceo_name":"homeWork","verified":true}
        });
  }

  loadMultiple(n){
    this.counter = 0;
    for (let i=0; i<n; i++){
      this.delay(10).then(() => new Promise((resolve) => {
            this.loadData();
            resolve(this.statuses);
        }));
    }
  }

  delay(sec: number){
    return new Promise((resolve)=> setTimeout(() => resolve(),sec))
    .then(() => console.log('Started req No =', this.counter++) );
  }
  refresh() {
    this.cache.cache.delete(this.endPointStauses);
    this.loadData();
  }
}
