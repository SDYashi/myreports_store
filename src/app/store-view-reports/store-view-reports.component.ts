import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
interface TestReport {
  samplecode: string;
  serial_no: string;
  manufacturer: string;
  date_of_receipt: string; // Dates stored as string 'YYYY-MM-DD'
  date_of_testing: string;
  date_of_issue: string;
  customer_name_and_address: string;
}

@Component({
  selector: 'app-store-view-reports',
  templateUrl: './store-view-reports.component.html',
  styleUrls: ['./store-view-reports.component.css']
})

export class StoreViewReportsComponent implements OnInit {

  dateRange = {
    startDate: '',
    endDate: ''
  };
  testReport: any = {}; // Initialize your test report object
  processing_tags: boolean = false; // For loading spinner
  processing_msgs: string = ''; // For loading messages
  step: number = 1; // For form steps
  allReports: TestReport[] = []; 
  filteredReports: TestReport[] = []; 
  sampleCode: string = '';

  constructor(private storeServices: StoreServicesService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    // Fetch all reports data on component init
    this.fetchAllReports();
  }

  onSubmit(form: any) {
    if (form.valid) {
      this.filterReports();   
    } else {
      console.log('Form is invalid');
    }
  }

fetchAllReports(): void {
  // Fetch reports for the current month by default
  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const currentMonthEnd = new Date();

  this.storeServices.gettestreport(currentMonthStart.toISOString().split('T')[0], currentMonthEnd.toISOString().split('T')[0]).subscribe({
    next: (data: TestReport[]) => {
      this.allReports = data; 
      this.filteredReports = this.allReports; 
    },
    error: (err) => {
      console.error('Error fetching reports:', err);
    }
  });
}

filterReports(): void {
  if (!this.dateRange.startDate || !this.dateRange.endDate) {
    alert('Please select both start and end dates');
    return;
  }

  const start = new Date(this.dateRange.startDate);
  const end = new Date(this.dateRange.endDate);

  if (start > end) {
    alert('Start date cannot be after end date');
    return;
  }

  // Call the API with the selected date range
  this.storeServices.gettestreport(this.dateRange.startDate, this.dateRange.endDate).subscribe({
    next: (data: TestReport[]) => {
      this.filteredReports = data;
    },
    error: (err) => {
      console.error('Error fetching filtered reports:', err);
    }
  });
}

  downloadPdf(sampleCode: string): void {
    this.storeServices.generatePdf(sampleCode).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TestReport-${sampleCode}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error('Error downloading PDF:', err);
        alert('Failed to download PDF. Please try again.');
      }
    });
  }

  redirectforedit(sampleCode: string): void {
    this.sampleCode = sampleCode;
     this.router.navigate(['store-home/store-edit-reports', this.sampleCode]);
  }

}

