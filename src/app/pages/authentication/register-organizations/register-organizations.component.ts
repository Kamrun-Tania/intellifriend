import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-register-organizations',
  templateUrl: './register-organizations.component.html',
  styleUrls: ['./register-organizations.component.scss']
})
export class RegisterOrganizationsComponent implements OnInit {

  step: any = 1;
  submitted : any =  false;

  multistep = new FormGroup({
    organizationDetails : new FormGroup({
      'orgName' : new FormControl('', Validators.required),
      'teamMemberCount' : new FormControl('',Validators.required),
      'phoneNumber' : new FormControl('', Validators.required)
    }),
    teamSetUp : new FormGroup({
      'team1' : new FormControl(''),
      'team2' : new FormControl(''),
      'team3' : new FormControl(''),
      'team4' : new FormControl(''),
      'team5' : new FormControl(''),
      'team6' : new FormControl(''),
      'team7' : new FormControl(''),
      'team8' : new FormControl(''),
      'team9' : new FormControl(''),
      'team10' : new FormControl(''),
      'team11' : new FormControl(''),
      'team12' : new FormControl('')
    })
  })

  constructor() { }

  ngOnInit(): void {
  }

  get organizationDetails () {
    return this.multistep.controls['organizationDetails']['controls'];
  }

  submit() {
    this.submitted = true;
    if(this.multistep.controls.organizationDetails.invalid && this.step == 1 ) {
      return;
    }
    if(this.multistep.controls.teamSetUp.invalid && this.step == 2 ) {
      return;
    }
    this.step = this.step + 1;
  }
  previous() {
    this.step = this.step -1;
  }
  skip() {
    this.step = this.step + 1;
  }

}
