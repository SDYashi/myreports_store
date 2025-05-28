import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-uploadlab-qr',
  templateUrl: './uploadlab-qr.component.html',
  styleUrls: ['./uploadlab-qr.component.css']
})
export class UploadlabQrComponent {
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
    if (!this.selectedFile) {
      this.storeServices.uploadqrimage(this.selectedFile).subscribe({
        next: (response) => {
          this.responseMessage = response.msg;
          alert(this.responseMessage);
        },
        error: (error) => {
          this.responseMessage = error.error;
          alert(this.responseMessage);
        }
      });
    }
  }
}
