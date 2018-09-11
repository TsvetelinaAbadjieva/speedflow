import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BASE_URL } from '../constants/constants';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  endPoint = BASE_URL+'/api/ui/userdata/';
  constructor(private http:HttpClient) { }

  ngOnInit() {
    console.log('In ONINIT UserComponent');
    this.http.get(this.endPoint).subscribe(res => console.log(res));
  }

}
