import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-add-reviewer-employee',
  templateUrl: './store-add-reviewer-employee.component.html',
  styleUrls: ['./store-add-reviewer-employee.component.css']
})
export class StoreAddReviewerEmployeeComponent implements OnInit {
 testerReviewer = {
    name: '',
    designation: '',
    employee_no: '',
    place_of_posting: '',
    mobile_number: '',
    employee_type: ''
  };
  testerReviewers: any[] = [];

  ngOnInit(): void {
  this.loadTesterReviewers();
   }

   loadTesterReviewers(): void {
    this.storeServices.getalltesterreviewer().subscribe(
      (response) => {
        this.testerReviewers = response;
      },
      (error) => {
        console.error('Error fetching tester reviewers:', error);
      }
    );
  }

  responseMessage: string | null = null;
  constructor(private http: HttpClient, private storeServices: StoreServicesService, private router: Router) {}
  onSubmit(): void {
   
    this.storeServices.addtesterreviewer(this.testerReviewer).subscribe(
      (response) => {
        this.responseMessage = 'Tester/Reviewer added successfully';
        document.getElementById('response-message')?.classList.add('text-success');
        this.testerReviewer = {
          name: '',
          designation: '',
          employee_no: '',
          place_of_posting: '',
          mobile_number: '',
          employee_type: ''
        };
      },
      (error) => {
        this.responseMessage = 'Error adding Tester/Reviewer';
        document.getElementById('response-message')?.classList.add('text-danger');
      }
    );
  }
}
