import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/shared/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  public editForm: FormGroup;

  public user = {
    firstname: '',
    lastname: '',
    email : '',
    password: ''
  };

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.user = this.auth.getUserData();
    this.editForm = fb.group({
        firstname: ['abc', [Validators.required, Validators.minLength(7)]]
      });
   }
   
  ngOnInit() { }

  onSubmit() {
    console.log(this.editForm.value);
  
    this.auth.editProfile(this.editForm.value['firstname'])
    .subscribe(
      () => {
        console.log("profile changed");
        this.router.navigateByUrl('/');
      },
      (e) => {
        console.log('error');
        console.log(e);
      }
    );
  }

}

