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
  profiles: ProfileModel[];
  
  constructor(private http:HttpClient, private sharedService: ShareDataService) { }

  ngOnInit() {
    console.log('In ONINIT ProfileComponent');
    this.sharedService.sharedObserver.subscribe(data => {
      this.profiles = data;
    });
  }

}
