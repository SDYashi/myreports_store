import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';
interface TestReport {
  sample_code: string;
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

  allReports: TestReport[] = []; 
  filteredReports: TestReport[] = []; 

  constructor(private storeServices: StoreServicesService) { }

  ngOnInit(): void {
    // Fetch all reports data on component init
    this.fetchAllReports();
  }

  fetchAllReports(): void {
    // Replace with real service call to get all reports
    this.storeServices.gettestreport().subscribe({
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

    this.filteredReports = this.allReports.filter(report => {
      const receiptDate = new Date(report.date_of_receipt);
      return receiptDate >= start && receiptDate <= end;
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      console.log('Form Submitted:', this.dateRange);
      // Add your submission logic here
    } else {
      console.log('Form is invalid');
    }
  }
}

