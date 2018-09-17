import { Component, OnInit } from '@angular/core';
import { BASE_URL } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { debounceTime, share } from 'rxjs/operators';
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
    this.http.get<any>(this.endPointStauses)
      .pipe(
        debounceTime(300),
        share()
      )
      .toPromise().then(
        res => {
          console.log('Load Status data... -> ', res);
          this.dataHasLoaded = true;
          this.status = {};
          this.statuses = [];
          this.status = {
            is_active: res.is_active,
            debet: res.debet,
            credit_limit: res.credit_limit,
            notification_threshold: res.notification_threshold,
            last_login: res.last_login,
            currency: res.currency
          }
          for (let i = 0; i < 3; i++) {
            this.statuses.push(this.status);
          }
        });
  }

  loadMultiple(n) {
    this.dataHasLoaded = false;
    for (let i = 0; i < n; i++) {
      return new Promise((resolve, reject) => {
        if (!this.dataHasLoaded) {
          this.loadData();
          resolve(this.statuses);
        } else {
          reject();
        }
      })
    }
  }

  refresh() {
    this.cache.cache.delete(this.endPointStauses);
    window.location.reload(true);
  }
}
