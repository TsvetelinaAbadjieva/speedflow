import { Component, Injectable } from '@angular/core';
import { PaymentsTableComponent } from '../payments-table/payments-table.component';
import { ProfileComponent } from '../profile/profile.component';
import { ProfileModel } from '../profile/profile.model';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../constants/constants';


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
          { title: 'Card 4', cols: 1, rows: 1 },
          { title: 'Card 1', cols: 1, rows: 1 },

        ];
      }

      return [
        { title: 'Profile', cols: 1, rows: 1 },
        { title: 'User details', cols: 1, rows: 1 },
        { title: 'Status', cols: 1, rows: 1},
        { title: 'Payment operations', cols: 3, rows: 1}
      ];
    })
  );


  constructor(private http: HttpClient, private sharedService: ShareDataService, private breakpointObserver: BreakpointObserver) { }

  endPoint = BASE_URL + 'ui/userdata/';
  profile: ProfileModel;

  ngOnInit() {
    console.log('In ONINIT ProfileComponent');
    console.log('BaseURL = ', BASE_URL);
    console.log('EndPoint = ', this.endPoint);


    this.http.get<ProfileModel>(this.endPoint).subscribe(
      res => {
        console.log('Dashboard result -> ',res);
        this.profile = {
          username: res.username,
          avatar: res.avatar,
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
          birthday: res.birthday,
          is_active: true,
          date_joined: res.date_joined,
          last_login: res.last_login,
          debet: 20.00,
          credit_limit: 30.00,
          notification_threshold: 20.00000,
          currency: res.currency,
          currency_name: res.currency_name,
          paypal_payments: true,
          borica_payments: true,
          cpa_redirect: res.cpa_redirect,
          cpa_postback: res.cpa_postback,

        }
        this.sharedService.setCurrentData(this.profile)    
        });

        //fake data
        // this.profile = {
        //   username: 'kalinka',
        //   avatar: 'http://demo.powowbox.com/powowbox/avatar_demo/Jane_0001.png',
        //   first_name: 'Kalina',
        //   last_name: 'Malina',
        //   email: 'kalinamalina@AbstractEmitterVisitor.bg',
        //   birthday: '11.07.1999',
        //   is_active: true,
        //   date_joined: '11.09.2018',
        //   last_login: '14.09.2018',
        //   debet: 20.00,
        //   credit_limit: 30.00,
        //   notification_threshold: 20.00000,
        //   currency: '$',
        //   currency_name: 'USD',
        //   paypal_payments: true,
        //   borica_payments: true,
        //   cpa_redirect: "http(s)://offerurl.com/?offer_id={offer_id}&",
        //   cpa_postback: "https://dev.adcharge.eu/api/cpa/response/?sid={click_id}",
        // }
        // localStorage.setItem('user', JSON.stringify({ token: 'mytoken', expires_date: Date.now() + 10000000000000 }));
      }
}
