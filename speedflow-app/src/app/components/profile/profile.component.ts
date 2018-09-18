import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL, BASE_URL_USERS } from '../../constants/constants';
import { ProfileModel } from './profile.model';
import { ShareDataService } from '../../services/share-data/share-data.service';
import { debounceTime } from 'rxjs/operators';
import { CacheService } from '../../services/cache/cache.service';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  endPoint = BASE_URL_USERS;
  profile: ProfileModel;
  profiles: ProfileModel[] = [];
  status: any = {};

  constructor(
    private http: HttpClient,
    private sharedService: ShareDataService,
    private cache: CacheService,
    private router: Router
  ) { }

  ngOnInit() {
    console.log('In ONINIT ProfileComponent');
    this.loadData();
  }
  refresh() {
    window.location.reload(true);
  }
  loadData() {
    this.sharedService.sharedObserver.subscribe(data => {
      this.profiles = data;
    });
  }
}
