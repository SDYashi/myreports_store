import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-add-job-rating',
  templateUrl: './store-add-job-rating.component.html',
  styleUrls: ['./store-add-job-rating.component.css']
})
export class StoreAddJobRatingComponent { 
  responseMessage: string = '';
  dtrcapacity:any = { dtr_capacity: '' } ;
  dtrCapacities: any;
  constructor(private http: HttpClient, private storeServices: StoreServicesService) { }
  onSubmit(form: any): void {
    if (form.valid) {
      this.storeServices.adddtrcapacity(this.dtrcapacity).subscribe({
        next: (response) => {
          this.responseMessage = response.msg;
          alert(this.responseMessage);
          this.dtrcapacity='';
           this.getjobrating();
        },
        error: (error) => {
          this.responseMessage = error.error;
          alert(this.responseMessage);
        }
      });
    } else {
      alert('Please fill in the required fields.');
    }
  }

  ngOnInit(): void {
    this.getjobrating();
  }

    getjobrating(){
    this.storeServices.getjobrating().subscribe({
      next: (data) => {
        this.dtrCapacities = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}