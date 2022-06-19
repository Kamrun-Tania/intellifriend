import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from './company';
import { CompanyService } from './company.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbdModalConfirm} from './modal-focus';



declare let d3: any;

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss'],
  
})
export class CompanyDashboardComponent  implements OnInit, OnDestroy {
  pageTitle = 'Company List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';
  sub!: Subscription;

  private _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredCompanies = this.performFilter(value);
  }

  filteredCompanies: Company[] = [];
  companies: Company[] = [];
  public deleteId: number | undefined;

  constructor(private companyService: CompanyService, private _modalService: NgbModal) {}
  

  performFilter(filterBy: string): Company[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.companies.filter((company: Company) =>
      company.companyName.toLocaleLowerCase().includes(filterBy));
  }

 

  ngOnInit(): void {
    this.sub = this.companyService.getCompanies().subscribe({
      next: companies => {
        this.companies = companies;
        this.filteredCompanies = this.companies;
        
      }, 
      
      error: err => this.errorMessage = err
    });
   
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  
  deleteCompany(companyName : string):void{
    const deleteCompany = this._modalService.open(NgbdModalConfirm);
    (deleteCompany.componentInstance as NgbdModalConfirm).companyName = companyName;
    
  }

}

