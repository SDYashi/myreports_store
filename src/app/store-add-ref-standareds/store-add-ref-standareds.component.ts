import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-add-ref-standareds',
  templateUrl: './store-add-ref-standareds.component.html',
  styleUrls: ['./store-add-ref-standareds.component.css']
})
export class StoreAddRefStandaredsComponent {

  ref_standard_formdata: string = '';
  responseMessage: string = '';
  constructor(private http: HttpClient, private storeServices: StoreServicesService) { }
  ngOnInit(): void {
    // Any initialization logic can go here
  }
  addRefStandard(): void {
    this.storeServices.addrefstandard(this.ref_standard_formdata).subscribe({
      next: (response) => {
        this.responseMessage = response.msg;
        alert(this.responseMessage);
        this.ref_standard_formdata = ''; 
      },
      error: (error) => {
        this.responseMessage = error.error;
        console.error('Error occurred:', error); 
      }
    });
  }
}
