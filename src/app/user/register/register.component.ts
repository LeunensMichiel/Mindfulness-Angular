import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import { Observable } from 'rxjs';
import {Router} from '@angular/router';

function passwordValidator(length: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return control.value.length < length ? {
      'passwordTooShort':
        {requiredLength: length, actualLength: control.value.length}
    } : null;
  };
}

function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  return password.value === confirmPassword.value ? null : {'passwordsDiffer': true};
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;

  get passwordControl(): FormControl {
    return <FormControl>this.user.get('passwordGroup').get('password');
  }

  constructor(private _authenticationService: AuthenticationService, private _router: Router, private _fb: FormBuilder) {
  }

  ngOnInit() {
    this.user = this._fb.group({
      email: ['', [Validators.required, Validators.minLength(4)],
        this.serverSideValidateEmail()],
      passwordGroup: this._fb.group({
        password: ['', [Validators.required, passwordValidator(12)]],
        confirmPassword: ['', Validators.required]
      }, {validator: comparePasswords})
    });
  }

  private serverSideValidateEmail() {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      return this._authenticationService
        .checkEmailAvailability(control.value)
        .pipe(
          map(available => {
            if (available) {
              return null;
            }
            return { userAlreadyExists: true };
          })
        )
    }
  }

  onSubmit() {
    this._authenticationService.register(this.user.value.email, this.passwordControl.value).subscribe(val => {
      if (val) {
        this._router.navigate(['/course-list']);
      }
    });
  }

}

