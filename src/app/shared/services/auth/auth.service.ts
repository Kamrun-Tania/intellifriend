import { Injectable, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '@environments/environment';
// import { HttpClient, HttpResponse } from '@angular/common/http';
// import { Observable, pipe } from 'rxjs';
// import { switchMap, map } from 'rxjs/operators';



// External
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit {

  public userData: any;
  public user: any;
  private _sessionId: string;
  public showLoader: boolean = false;

  private baseUrl: string = environment.apiBaseUrl;

  constructor(
    private http: HttpClient,
    public router: Router,
    public ngZone: NgZone,
    public toster: ToastrService,
    private cookieService: CookieService
  ) {

    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     this._sessionId = this.userData;
    //     cookieService.set('user', JSON.stringify(this.userData));
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));
    //     this.router.navigateByUrl('/dashboard/default');
    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // });
  }

  ngOnInit(): void { }

  //sign in function
  login(email, password) {
    // url
    const url: string = this.baseUrl + '/authentication';
    const data = {
      "strategy": "local",
      "email": email,
      "password": password
    }

    return this.http.post(url, data).pipe(
      map((res: Response) => {
        this.SetUserData(res);
        return res;
      })
    );

   

    // return this.afAuth.auth.signInWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     if (result.user.emailVerified !== true) {
    //       this.SetUserData(result.user);
    //       this.SendVerificationMail();
    //       this.showLoader = true;
    //     } else {
    //       this.showLoader = false;
    //       this.ngZone.run(() => {
    //         this.router.navigate(['/auth/login']);
    //       });
    //     }
    //   }).catch((error) => {
    //     this.toster.error('You have enter Wrong Email or Password.');
    //   })
  }


  //sign in function
  registration(data: Object) {
    // url
    const url: string = this.baseUrl + '/users';
    const formdata = data;
    formdata['strategy'] = "local";
    formdata['role'] = "user";

    return this.http.post(url, data).pipe(
      map((res: Response) => {
        // this.SetUserData(res);
        return res;
      })
    );

  }
  //main verification function
  SendVerificationMail() {
    // return this.afAuth.auth.currentUser.sendEmailVerification()
    //   .then(() => {
    //     this.router.navigate(['/dashboard/default']);
    //   })
  }


  ForgotPassword(passwordResetEmail) {
    // return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    //   .then(() => {
    //     window.alert('Password reset email sent, check your inbox.');
    //   }).catch((error) => {
    //     window.alert(error);
    //   });
  }

  //Authentication for Login
  AuthLogin(provider) {
    // return this.afAuth.auth.signInWithPopup(provider)
    //   .then((result) => {
    //     this.ngZone.run(() => {
    //       this.router.navigate(['/dashboard/default']);
    //     });
    //     this.SetUserData(result.user);
    //   }).catch((error) => {
    //     window.alert(error);
    //   });
  }

   /** PUT: update the data on the server. Returns the updated data upon success. */
   editProfile(firstname) {
      // url
      const url: string = this.baseUrl + '/users';
      const formdata =  {
      'strategy' : "local",
      'roles' : "user",
      'firstname' : firstname
      }

    return this.http.put(url, formdata).pipe(
      map((res: Response) => {
        this.SetUserData(res);
        return res;
      })
    );
   }


  //Set user
  SetUserData(data) {

    if (data.user) {
      this.userData = data.user;
      this._sessionId = this.userData;
      this.cookieService.set('user', JSON.stringify(this.userData));
      localStorage.setItem('user', JSON.stringify(this.userData));
      JSON.parse(localStorage.getItem('user'));

      localStorage.setItem('access_token', data.accessToken);

      this.router.navigateByUrl('/dashboard/default');
    } else {
      localStorage.setItem('user', null);
      JSON.parse(localStorage.getItem('user'));
    }

  }

  getUserData() {
    return JSON.parse(localStorage.getItem('user'));
  }

  getId() {
    return this.getUserData()['_id'];
  }

  // Sign out
  SignOut() {

    this.showLoader = false;
    localStorage.clear();
    this.cookieService.deleteAll('user', '/authentication/login');
    this.router.navigate(['/authentication/login']);

  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user != null && user.emailVerified != false) ? true : false;
  }

  public isAuthenticated() {

    let user = JSON.parse(localStorage.getItem('user'));
    let access_token = localStorage.getItem('access_token');

    const helper = new JwtHelperService();
    const expirationDate = helper.getTokenExpirationDate(access_token);
    const isExpired = helper.isTokenExpired(access_token);

    return !isExpired && !!user;

  }

  public isRole(rolename) {

    let user = JSON.parse(localStorage.getItem('user'));
    let access_token = localStorage.getItem('access_token');

    const helper = new JwtHelperService();
    const expirationDate = helper.getTokenExpirationDate(access_token);
    const isExpired = helper.isTokenExpired(access_token);

    console.log(user);

    return !isExpired && !!user;

  }

}