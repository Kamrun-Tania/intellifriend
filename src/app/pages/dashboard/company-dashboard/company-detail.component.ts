import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from './company';
import { CompanyService } from './company.service';

@Component({
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.css']
})
export class CompanyDetailComponent implements OnInit {
  pageTitle = 'Company Detail';
  errorMessage = '';
  company: Company | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private companyService: CompanyService) {
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCompany(id);
    }
  }

  getCompany(id: string): void {
    this.companyService.getCompany(id).subscribe({
      next: company => this.company= company,
      error: err => this.errorMessage = err
    });
  }
}

  

