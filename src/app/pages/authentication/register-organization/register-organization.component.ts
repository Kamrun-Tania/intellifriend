import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register-organization',
  templateUrl: './register-organization.component.html',
  styleUrls: ['./register-organization.component.scss']
})
export class RegisterOrganizationComponent implements OnInit {

  @Input() formData;
  title = 'Wizard Three';

  constructor() { }

  ngOnInit() {
  }

}
