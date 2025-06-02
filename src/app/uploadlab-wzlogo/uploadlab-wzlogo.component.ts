import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-uploadlab-wzlogo',
  templateUrl: './uploadlab-wzlogo.component.html',
  styleUrls: ['./uploadlab-wzlogo.component.css']
})
export class UploadlabWzlogoComponent {
  responseMessage: any;
  constructor(private storeServices: StoreServicesService) { }
  selectedFile: File | null = null;
  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selected:', this.selectedFile.name);
    } else {
      this.selectedFile = null;
    }
  }
   onSubmit(): void {
       if (this.selectedFile) {
           console.log('Submitting file:', this.selectedFile.name);  // Log the file name
           const formData = new FormData();
           formData.append('file', this.selectedFile);  
           this.storeServices.uploadwzimage(formData).subscribe({
               next: (response) => {
                   this.responseMessage = response.msg;
                   alert(this.responseMessage);
               },
               error: (error) => {
                   this.responseMessage = error.error;
                   alert(this.responseMessage);
               }
           });
       } else {
           alert('No file selected. Please select a file to upload.');
       }
   }
   

}

