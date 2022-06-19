import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrganizationsComponent } from './register-organizations.component';

describe('RegisterOrganizationsComponent', () => {
  let component: RegisterOrganizationsComponent;
  let fixture: ComponentFixture<RegisterOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterOrganizationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
