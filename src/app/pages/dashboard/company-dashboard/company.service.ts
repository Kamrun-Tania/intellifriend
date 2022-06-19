import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map, tap } from 'rxjs/operators';
import { Company } from "./company";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  // If using Stackblitz, replace the url with this line
  // because Stackblitz can't find the api folder.
  // private companyUrl = 'assets/companies/companies.json';
  private companyUrl = 'assets/companies/companies.json';

  private companies: Company[];
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {
    
    return this.http.get<Company[]>(this.companyUrl)
      .pipe(
        tap(data => console.log('All: ', JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  // Get one company
  // Since we are working with a json file, we can only retrieve all companies
  // So retrieve all companies and then find the one we want using 'map'
  getCompany(id: string): Observable<Company | undefined> {
    console.log (id);
    return this.getCompanies()
      .pipe(
        map((companies: Company[]) => companies.find(p => p.companyName=== id))
      );
  }

  deleteCompany(id: string){
    alert(id);
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
