import { Component, OnInit, Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../../constants/constants';
import { ProfileModel } from './profile.model';
import { ShareDataService } from '../../services/share-data/share-data.service';

import { CacheService } from '../../services/cache/cache.service';
import { Router } from '@angular/router';

@Injectable()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  @Input() userProfile: ProfileModel;
  endPoint = BASE_URL + '/api/ui/userdata/';
  profile: ProfileModel;
  profiles: ProfileModel[];
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
    this.cache.clear();
    this.router.navigate(['user-data']);
  }
  async loadData() {
    this.sharedService.sharedObserver.subscribe(data => {
      this.profiles = data;
    });
  }
  async loadDataMultiple(n) {
    for(var i=0; i<n; i++){
      await this.loadData();
    }
  }
}
