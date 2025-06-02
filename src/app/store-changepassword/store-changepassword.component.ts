import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-changepassword',
  templateUrl: './store-changepassword.component.html',
  styleUrls: ['./store-changepassword.component.css']
})
export class StoreChangepasswordComponent {

oldPassword: string = '';
  newPassword: string = '';
  message: string | null = null;
  error: string | null = null;
  constructor(private http: HttpClient, private router: Router , private storeServices: StoreServicesService) {}
  onSubmit(): void {
    const payload = {
      old_password: this.oldPassword,
      new_password: this.newPassword,
    };
   this.storeServices.changepassword(payload).subscribe(
     (response) => {
       this.message = response.message;
       this.error = null;
     },
     (errors) => {
       this.error = errors.error.error;
       this.message = null;
     }
   )
  }
}
