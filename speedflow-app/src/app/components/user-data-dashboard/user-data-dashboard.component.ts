import { Component, Injectable, Input } from '@angular/core';
import { ProfileModel } from '../profile/profile.model';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { map, debounceTime, switchMap, distinctUntilChanged, take, share, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, BASE_URL_USERS } from '../../constants/constants';
import { Router } from '@angular/router';
import { CacheService } from '../../services/cache/cache.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatSpinner} from '@angular/material';


@Component({
  selector: 'app-user-data-dashboard',
  templateUrl: './user-data-dashboard.component.html',
  styleUrls: ['./user-data-dashboard.component.css']
})

@Injectable()
export class UserDataDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Users', cols: 1, rows: 1 },
        { title: 'Statuses', cols: 1, rows: 1 }
      ];
    })
  );
  endPoint = BASE_URL_USERS;
  endPointStauses = BASE_URL + 'ui/userdata/';

  profiles: ProfileModel[] = [];
  profile: ProfileModel;
  pages: any = {};
  status: any = {};
  counter: number = 0;
  loadDataBtn: any;
  dataHasLoaded: boolean = false;
  spinner: MatSpinner;

  constructor(
    private http: HttpClient,
    private sharedService: ShareDataService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private cache: CacheService,
    private auth: AuthService
  ) { }


  ngOnInit() {
    
    console.log('In ONINIT ProfileComponent');
    console.log('BaseURL = ', BASE_URL);
    console.log('EndPoint = ', this.endPoint);
    console.log('EndPointStatuses = ', this.endPointStauses);
    this.dataHasLoaded = false;
    this.profiles = [];
    this.loadData();

  }

  loadData(): any {
    this.dataHasLoaded = false;
    this.http.get<any>(this.endPoint)
      .pipe(
        debounceTime(300),
        shareReplay()
      )
      // .subscribe(
      .toPromise().then(
        res => {
          this.profiles = [];
          this.pages = {};
          console.log('REQUEST PASSED Dashboard result -> ', res);
          this.dataHasLoaded = true;
          let data = res.data;
          data.forEach(element => {
            this.profile = {
              id: element.id,
              avatar: element.avatar,
              first_name: element.first_name,
              last_name: element.last_name,
            }
            this.profiles.push(this.profile);
          });
          this.pages = {
            page: res.page,
            per_page: res.per_page,
            total: res.total,
            total_pages: res.total_pages,
          }
          this.dataHasLoaded = true;
          console.log('loadData Executing...', this.counter++);
          this.sharedService.setCurrentData(this.profiles)
        });
  }

  loadNewData() {
    this.loadData();
  }

  loadMultiple(n) {
    for (let i = 0; i < n; i++) {
      new Promise((resolve) => {
        this.loadData();
        resolve(this.profiles);
        resolve(this.pages)
      })
    }
  }
  refreshProfiles() {
    this.cache.cache.delete(this.endPoint);
    console.log('Cache Clear ', this.cache);
    if (!this.auth.getAuthenticationToken) {
      console.log(this.auth.getAuthenticationToken);
      this.router.navigate(['/']);
    }
    this.loadData();
  }

  refresh() {
    this.cache.cache.delete(this.endPoint);
    console.log('Cache Clear ', this.cache);
    if (!this.auth.getAuthenticationToken) {
      console.log(this.auth.getAuthenticationToken);
      this.router.navigate(['/']);
    }
    window.location.reload(true);
  }
}
