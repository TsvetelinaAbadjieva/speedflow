import { Component, Injectable } from '@angular/core';
import { PaymentsTableComponent } from '../payments-table/payments-table.component';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileModel } from '../profile/profile.model';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, BASE_URL_USERS } from '../../constants/constants';


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
          { title: 'Card 2', cols: 1, rows: 5 },
          // { title: 'Card 3', cols: 1, rows: 1 },
          // { title: 'Card 4', cols: 1, rows: 1 },
          // { title: 'Card 1', cols: 1, rows: 1 },

        ];
      }

      return [
        { title: 'Users', cols: 1, rows: 5 },
        // { title: 'Pages', cols: 1, rows: 1}
      ];
    })
  );

  // endPoint = BASE_URL + 'ui/userdata/';
  endPoint = BASE_URL_USERS;
  endPointStauses = BASE_URL + 'ui/userdata/';

  profiles: ProfileModel[] = [];
  profile: ProfileModel;
  pages: any = {};
  status: any = {};

  constructor(private http: HttpClient, private sharedService: ShareDataService, private breakpointObserver: BreakpointObserver) { }


  ngOnInit() {
    console.log('In ONINIT ProfileComponent');
    console.log('BaseURL = ', BASE_URL);
    console.log('EndPoint = ', this.endPoint);
    console.log('EndPointStatuses = ', this.endPointStauses);
    this.loadMultiple(3);

  }

  loadData(){
    this.http.get<any>(this.endPoint)
    // .subscribe(
    .toPromise().then(
      res => {
        console.log('Dashboard result -> ', res);
        let data = res.data;
        data.forEach(element => {
          console.log('element', element)
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
        this.sharedService.setCurrentData(this.profiles)
      });
  }

  loadMultiple(n){
    for (var i=0; i< n; i++){
      this.loadData();
    }
  }
}
