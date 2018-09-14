import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../constants/constants';
import { ProfileModel} from './profile.model';
import { ShareDataService } from '../../services/share-data/share-data.service';

import { AbstractEmitterVisitor } from '@angular/compiler/src/output/abstract_emitter';

@Injectable()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  @Input() userProfile: ProfileModel;
  endPoint = BASE_URL+'/api/ui/userdata/';
  profile: ProfileModel;
  
  constructor(private http:HttpClient, private sharedService: ShareDataService) { }

  ngOnInit() {
    console.log('In ONINIT ProfileComponent');
    // this.http.get<ProfileModel>(this.endPoint).subscribe(
    //   res => {console.log(res);
        // this.profile = {
        //   firstName: res.firstName,
        //   lastName: res.laststName,
        //   email: res.emailName,
        //   birthday: res.birthday,
        //   username:  res.username,
        //   avatar: res.avatar,
        //   isActive: true,
        //   dateJoint: res.date_joined,
        //   lastLogin: res.last_login,
        //   debet: res.debet,
        //   credit: res.credit_limit,
        //   currency: res.currency,
        //   currencyName: res.currency_name,
        //   paypalPayments: res.paypal_payments,
        //   boricaPayments: res.borica_payments,
        //   cpaRedirect: res.cpa_redirect,
        //   cpaPastPostback: res.cpa_postback 
    
        // }
      // });

      //fake data for test
    //   this.profile = {
    //     username:  'kalinka',
    //     avatar: 'http://demo.powowbox.com/powowbox/avatar_demo/Jane_0001.png',
    //     first_name: 'Kalina',
    //     last_name: 'Malina',
    //     email: 'kalinamalina@AbstractEmitterVisitor.bg',
    //     birthday: '11.07.1999',
    //     is_active: true,
    //     date_joined: '11.09.2018',
    //     last_login: '14.09.2018',
    //     debet: 20.00,
    //     credit_limit: 30.00,
    //     notification_threshold:20.00000,
    //     currency: '$',
    //     currency_name: 'USD',
    //     paypal_payments: true,
    //     borica_payments: true,
    //     cpa_redirect:"http(s)://offerurl.com/?offer_id={offer_id}&" ,   
    //     cpa_postback:"https://dev.adcharge.eu/api/cpa/response/?sid={click_id}",
    // }
      //this.profile = this.userProfile;
    this.sharedService.sharedObserver.subscribe(data => {
      this.profile = data;
      console.log('Profile data ->', this.profile);
    });
  }

}
