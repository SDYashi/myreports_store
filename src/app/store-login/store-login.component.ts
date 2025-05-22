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
  constructor(private router: Router, private storeService: StoreServicesService) { }

  onSubmit(form: any) {
    if (form.valid) {
      alert(this.userinfor.username + ' ' + this.userinfor.password);
      this.storeService.getverifylogin(this.userinfor).subscribe({
        next: (response) => {                    
             this.respose_msg = response.msg;
             alert('Login successful');
            this.router.navigate(['/store-home']);
        },
        error: (error) => {
            this.respose_msg = error.msg;
          alert('Error: ' + error);
        }
      });      
    
    } else {
      console.log('Form is invalid');
    }
  }
 
}
