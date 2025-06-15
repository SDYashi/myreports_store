import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-add-customer-name-addrs',
  templateUrl: './store-add-customer-name-addrs.component.html',
  styleUrls: ['./store-add-customer-name-addrs.component.css']
})
export class StoreAddCustomerNameAddrsComponent {
  customer_name: string = '';
  responseMessage: string = '';
  customerList: any;

  constructor(private http: HttpClient, private storeServices: StoreServicesService) { }

  ngOnInit(): void {
    this.getregisteredcustomer();
  }
    getregisteredcustomer(){
    this.storeServices.getcustomername().subscribe({
      next: (data) => {
        this.customerList = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addCustomerName(): void {
    this.storeServices.addcustomername(this.customer_name).subscribe({
      next: (response) => {
        this.responseMessage = response.msg;
        alert(this.responseMessage);
        this.customer_name = ''; 
         this.getregisteredcustomer();
      },
      error: (error) => {
        this.responseMessage = error.error;
        console.error('Error occurred:', error); 
      }
    });
  }
}
