import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-store-edit-reports',
  templateUrl: './store-edit-reports.component.html',
  styleUrls: ['./store-edit-reports.component.css']
})
export class StoreEditReportsComponent {
  searchflag: boolean = false;
  testReport: any = {};
  responseMessage: any;
  templateviw: any = { searchText: '' };
  processing_msgs: string='';
constructor(private storeServices: StoreServicesService) { }
  loadReports() {
    this.storeServices.loadReportsforedit(this.templateviw.samplecode).subscribe({
      next: (response) => {
        this.searchflag = true;
        this.testReport = response;

      },
      error: (error) => {
        this.searchflag = false;
        console.error('Error loading reports:', error);
        alert('Failed to load reports. Please try again.');
      }
    });
  }

  editreports(test_report_formdata: any) {
   this.storeServices.updatetestreport(test_report_formdata).subscribe({
     next: (response) => {
       this.responseMessage = response.message;
       alert(this.responseMessage);
       this.searchflag = false;
     },
     error: (error) => {
       this.responseMessage = error.error;
       alert(this.responseMessage);
       this.searchflag = false;
     }
   })
  }

    step = 1;

  nextStep() {
    if (this.step < 2) this.step++;
  }

  previousStep() {
    if (this.step > 1) this.step--;
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.storeServices.adddtestreportdata(this.testReport).subscribe({
        next: (response) => {    
          this.processing_msgs = response.msg + 'Sample Code:' + response.samplecode;  
        },
        error: (error) => {
           this.processing_msgs = error.error;
        }
      });
   
      this.step = 1;
    } 
  }
   

}
