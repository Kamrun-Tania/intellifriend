import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '@services/auth/auth.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  // public user: any;
  public loginForm: FormGroup;
  public formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  public errorMessage: any;

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = fb.group({
      email: ['tahmina@intellifriend.com', [Validators.required, Validators.email]],
      password: ['1122334455', Validators.required]
    });
  }

  ngOnInit() { }

  // Simple Login
  onSubmit() {
    console.log(this.loginForm.value);
    // this.feathers.authenticate({
    //   strategy: 'local',
    //   email: this.loginForm.value['email'],
    //   password: this.loginForm.value['password']
    // }).then(data => {
    //   console.log(data);
    // }).catch(e => {
    //   console.log(e);
    // });
    this.authService.login(this.loginForm.value['email'], this.loginForm.value['password'])
    .subscribe(
      () => {
        console.log("User is logged in");
        this.router.navigateByUrl('/');
      },
      (e) => {
        console.log('error');
        console.log(e);
      }
    );
  }

}
