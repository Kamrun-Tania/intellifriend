import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

type UserFields = 'email' | 'password' | 'firstname' | 'lastname';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public regForm: FormGroup;
  public formErrors: FormErrors = {
    'firstname': '',
    'lastname': '',
    'email': '',
    'password': '',
  };
  public errorMessage: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.regForm = fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isVerifiedEmail: false,
    });
  }

  ngOnInit() { }

  // Simple Login
  onSubmit() {
    this.authService.registration(this.regForm.value).subscribe(
      (d) => {
        console.log(d);
        if (d['_id']) {
          this.authService.login(this.regForm.value['email'], this.regForm.value['password'])
            .subscribe(
              () => {
                console.log("User is logged in");
                this.router.navigateByUrl('/authentication/onboard');
              },
              (e) => {
                console.log('error');
                console.log(e);
              }
            );
        }

      }
    );
  }

}
