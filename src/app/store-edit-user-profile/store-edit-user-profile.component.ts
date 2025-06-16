import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-store-edit-user-profile',
  templateUrl: './store-edit-user-profile.component.html',
  styleUrls: ['./store-edit-user-profile.component.css']
})
export class StoreEditUserProfileComponent implements OnInit {
  userProfile: any = null;
  responseMessage: string = '';
  userProfileForm: any;

  constructor(private http: HttpClient, private storeServices: StoreServicesService) { }
  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile(): void {
    this.storeServices.getloginuserprofile().subscribe({
      next: (response) => {
        this.userProfile = response;
           
      },
      error: (error) => {
        this.responseMessage = error.error;
        alert(this.responseMessage);
      }
    })
  }

   onSubmit(userProfileForm: any): void {
    this.storeServices.edituserprofile(userProfileForm.value).subscribe({
      next: (response) => {
        this.responseMessage = response.msg;
        alert(this.responseMessage);
      },
      error: (error) => {
        this.responseMessage = error.error.msg;
        alert(this.responseMessage);
      }
    });
  }
}

