import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl} from '@angular/forms';
import { LoginService} from '../../services/login/login.service';
import { BASE_URL, EXPIRE_TOKEN } from '../../constants/constants';
import { Observer, throwError} from 'rxjs';
import { tap} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';


const PATTERN_USERNAME = /^[A-Za-z0-9_]*$/;
const PATTERN_PASSWORD = /^[A-Za-z0-9_?*$#!]*$/;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted:boolean;
  errorMsg: string;
  inProgress: boolean;
  dataHasLoaded: boolean;

  constructor(private fb: FormBuilder, private api: LoginService, private router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.inProgress = false;
    this.dataHasLoaded = false;
    this.errorMsg = '';
    this.isSubmitted = false;
    this.loginForm = this.fb.group({
      username: new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern(PATTERN_USERNAME)]),
      password: new FormControl('',[Validators.required, Validators.minLength(4), Validators.pattern(PATTERN_PASSWORD)]),

    });
  }
  get f(){
    return this.loginForm.controls;
  }
  get username(){
    return this.loginForm.controls.username;
  }
  get password(){
    return this.loginForm.controls.password;
  }

  bindModel(){
    let userModel = {
      username: this.loginForm.get('username').value.trim(),
      password: this.loginForm.get('password').value.trim()
    }
    return userModel;
  }


  onSubmit(){
    console.log('In login submit')
    this.isSubmitted = true;
    // this.inProgress = true;
    this.dataHasLoaded = false;
    this.errorMsg = '';
    let user = this.bindModel();
    console.log(user);

    if(this.loginForm.invalid){
      return;
    }
    
    this.isSubmitted = false;
    let _this = this;    
    this.api.login(user, _this);
    // .subscribe(
    //   (user) => {
    //       console.log(user);
    //       if (user && user.token){
    //           // const userData = {
    //           //     token: user.token,
    //           //     expires_date: Date.now()+EXPIRE_TOKEN
    //           //     // expires_date: user.expires_date
    //           // }
    //           _this.auth.setToken(user.token);
    //           console.log('After save token ', localStorage.getItem('user'))
    //           _this.router.navigate(['user-data']);
    //       } else {
    //         _this.errorMsg ="Invalid credentials";
    //         _this.router.navigate(['/']);        
    //       }
    //   }
    //   // error => {
    //   //   _this.errorMsg ="Invalid credentials";
    //   //   _this.router.navigate(['/']);        
    //   //   throwError(error);
    //   // }
    //  );

  }
}
