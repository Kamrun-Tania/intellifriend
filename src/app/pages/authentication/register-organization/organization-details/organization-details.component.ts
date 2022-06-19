import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrganizationDetailsComponent implements OnInit {
  public border_validation = false;
  public regForm: FormGroup;
  public title: string = "organization-details page"
  public form: any;
  constructor(private route: Router, private fb: FormBuilder) {
    this.createForm();
  }

  //create form
  createForm() {
    this.regForm = this.fb.group({
      firstName: [null, [Validators.required, Validators.pattern(/^[A-z]*$/),]],
      lastName: [null, [Validators.required, Validators.pattern(/^[A-z]*$/),]]
    });
  }

  save(form: any) {
    if (!form.valid) {
      return false;
    }
    return true;
  }

  ngOnInit() {  }

}
