import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-changepassword',
  templateUrl: './store-changepassword.component.html',
  styleUrls: ['./store-changepassword.component.css']
})
export class StoreChangepasswordComponent {

 message: string | null = null;
  error: string | null = null;
  constructor(private storeServices: StoreServicesService) {}
  onSubmit(form: any) {
    const { oldPassword, newPassword } = form.value;
    const payload = {
      changepassword_formdata: {
        old_password: oldPassword,
        new_password: newPassword
      }
    };

    this.storeServices.changepassword(payload).subscribe(
      (response) => {
        this.message = response.message;
        alert(this.message);
        this.error = null;
      },
      (error) => {
        this.message = null;
        this.message = error.error.msg;
      }
    );
    
  }
}
