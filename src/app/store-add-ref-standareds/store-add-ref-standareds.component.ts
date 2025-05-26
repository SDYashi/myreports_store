import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-add-ref-standareds',
  templateUrl: './store-add-ref-standareds.component.html',
  styleUrls: ['./store-add-ref-standareds.component.css']
})
export class StoreAddRefStandaredsComponent implements OnInit {
  ref_statandard: string = '';
  responseMessage: string = '';
  constructor(private http: HttpClient, private storeServices: StoreServicesService) { }
  ngOnInit(): void {
  }
  addRefStandard(): void {
    this.storeServices.addrefstandard(this.ref_statandard).subscribe({
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

