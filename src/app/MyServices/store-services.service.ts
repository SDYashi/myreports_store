import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreServicesService {  
  private readonly baseUrl = '/apis';
  constructor(private http: HttpClient) { }

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  //   })
  // };

  getverifylogin(userinfor: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/login`, { userinfor });
  }
  adddtestreportdata(test_report_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_testreport`, { test_report_formdata});
  }
  adddtrcapacity(dtr_capacity_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_dtr_capacity`, { dtr_capacity_formdata});
  }
  addcustomername(customer_name_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_customer_name`, { customer_name_formdata});
  }
  addrefstandard(ref_standard_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_ref_statandard`, { ref_standard_formdata});
  }
  addjobrating(job_rating_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_dtr_capacity`, { job_rating_formdata});
  }
  getjobrating(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_all_dtr_capacity`);
  }
  gettestreport(start_date: string, end_date: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_testreport?start_date=${start_date}&end_date=${end_date}`);
  }
  getsamplecode(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_samplecode`);
  }
  getcustomername(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_customer_name`);
  }
  
  getrefstandard(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_refstatandard`);
  }
  getuserprofile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_tester_reviewer_name`);
  }
  getloginuserprofile(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_userprofile`);
  }

  generatePdf(sampleCode: string): Observable<Blob> {
       return this.http.post(`${this.baseUrl}/ngbreports_api/v1/api/get_sample_code_pdf`, { samplecode: sampleCode }, { responseType: 'blob' });
  }

  edituserprofile(user_profile_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/edit_userprofile`, { user_profile_formdata});
  }

  loadReportsforedit(samplecode: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_testreport?samplecode=${samplecode}`);
  }

  updatetestreport(test_report_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/update_testreport`, { test_report_formdata});
  }
  // uploadqrimage(image: any): Observable<any> {
  //   return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/upload_qr_image`, { image});
  // }

  uploadqrimage(formData: FormData): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/upload_lab_qr`, formData);
  }

  uploadwzimage(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/upload_wz_logo`,  formData);
  }

  addtesterreviewer(tester_reviewer_formdata: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/ngbreports_api/v1/api/add_tester_reviewer`, { tester_reviewer_formdata});
  }

  gettesterreviewer(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_tester_reviewer_name`);
  }

 getalltesterreviewer(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/ngbreports_api/v1/api/get_all_tester_reviewer`);
  }

}

