import { Component, OnInit } from '@angular/core';
import { BASE_URL } from '../../constants/constants';
import { HttpClient } from '@angular/common/http';
import { ShareDataService } from '../../services/share-data/share-data.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})

export class StatusComponent implements OnInit {

  status: any={};
  statuses: any[] = [];
  endPointStauses = BASE_URL+'ui/userdata/';

  constructor(private http: HttpClient, private sharedService: ShareDataService) { }

  ngOnInit() {
    console.log('In ONINIT StatusComponent');
    this.http.get<any>(this.endPointStauses).toPromise().then(
      res => {
        console.log('Status result -> ', res);
        let data = res;
        this.status = {
          is_active: res.is_active,
          debet: res.debet,
          credit_limit: res.credit_limit,
          notification_threshold: res.notification_threshold,
          last_login: res.last_login,
          currency: res.currency
        }
        for(let i=0; i<3; i++){
          this.statuses.push(this.status);
        }
      });
  }

}
