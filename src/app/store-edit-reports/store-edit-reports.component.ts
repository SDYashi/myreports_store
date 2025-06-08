import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';

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
  processing_msgs: string = '';
  step = 1;
  sampleCode: string = '';

  constructor(private storeServices: StoreServicesService, private route: ActivatedRoute,private router: Router) { }

 ngOnInit(): void {
  this.route.params.subscribe(params => {
    const sampleCode = params['samplecode'];
    if (sampleCode) {
      this.sampleCode = sampleCode;
      this.fetchTestReport(sampleCode);
    }
  });
}


  fetchTestReport(sampleCode: string): void {
    this.storeServices.loadReportsforedit(sampleCode).subscribe({
      next: (data) => {
        this.testReport = data; 
      },
      error: (error) => {
        this.responseMessage = error.error;
        alert(this.responseMessage);
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
    });
  }

  nextStep() {
    if (this.step < 2) this.step++;
  }

  previousStep() {
    if (this.step > 1) this.step--;
  }
}