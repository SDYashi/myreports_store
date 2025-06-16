import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-login',
  templateUrl: './store-login.component.html',
  styleUrls: ['./store-login.component.css']
})
export class StoreLoginComponent {

  userinfor = {
    username: '',
    password: ''
  };
  respose_msg: any;
  loading = false;
  constructor(private router: Router, private storeService: StoreServicesService) { }

  onSubmit(form: any) {
    if (form.valid) {
      this.loading = true;
      this.respose_msg = 'Processing...';
      this.storeService.getverifylogin(this.userinfor).subscribe({
        next: (response) => { 
            localStorage.setItem('access_token', response.access_token);
            this.loading = false;
            this.router.navigate(['/store-home']);
            
        },
        error: (error) => {
           this.loading = false;
            this.respose_msg = error.error.msg;
          // alert('Error: ' + this.respose_msg);
        }
      });      
    
    } else {
      console.log('Form is invalid');
    }
  }
 
}
