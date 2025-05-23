import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreServicesService {  
  private readonly baseUrl = '/apis';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getverifylogin(userinfor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/login`, { userinfor }, this.httpOptions);
  }
  adddtestreportdata(test_report_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_testreport`, { test_report_formdata}, this.httpOptions);
  }
  adddtrcapacity(dtr_capacity_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_dtr_capacity`, { dtr_capacity_formdata}, this.httpOptions);
  }
  addcustomername(customer_name_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_customer_name`, { customer_name_formdata}, this.httpOptions);
  }
  getjobrating(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_all_dtr_capacity`, this.httpOptions);
  }
  gettestreport(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_testreport`, this.httpOptions);
  }
  getsamplecode(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_samplecode`, this.httpOptions);
  }
  getcustomername(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_customer_name`, this.httpOptions);
  }
  
  getrefstandard(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_refstatandard`, this.httpOptions);
  }

}

