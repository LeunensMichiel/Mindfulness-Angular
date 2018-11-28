import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: FormGroup;
  public errorMsg: string;

  constructor(private _authenticationService: AuthenticationService, private _router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.user = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this._authenticationService.login(this.user.value.email, this.user.value.password).subscribe(val => {
      if (val) {
        if (this._authenticationService.redirectUrl) {
          this._router.navigateByUrl(this._authenticationService.redirectUrl);
          this._authenticationService.redirectUrl = undefined;
        } else {
          this._router.navigate(['/course-list']);
        }
      }
    }, err => console.log(err));
  }
}
