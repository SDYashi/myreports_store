import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-add-job-rating',
  templateUrl: './store-add-job-rating.component.html',
  styleUrls: ['./store-add-job-rating.component.css']
})
export class StoreAddJobRatingComponent {
  dtr_capacity: string ='';
  responseMessage: string='';
  constructor(private http: HttpClient, private storeServices: StoreServicesService) { }
  addDtrCapacity(): void {
     this.storeServices.adddtrcapacity(this.dtr_capacity).subscribe({
       next: (response) => {
         this.responseMessage = response.msg;
         alert(this.responseMessage);
       },
       error: (error) => {
         this.responseMessage = error.error;
         alert(this.responseMessage);
       }
     })
  }
}
