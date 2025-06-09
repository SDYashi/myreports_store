import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-uploadlab-qr',
  templateUrl: './uploadlab-qr.component.html',
  styleUrls: ['./uploadlab-qr.component.css']
})

export class UploadlabQrComponent { selectedFile: File | null = null;
  responseMessage: string | null = null;
  imageUrl: string | null = null;
  constructor(private storeServices: StoreServicesService) {}

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
    const formData = new FormData();
    formData.append('file', this.selectedFile); // ✅ key is "file"

    this.storeServices.uploadqrimage(formData).subscribe({
      next: (response) => {
        this.responseMessage = response.msg;
        this.imageUrl = response.image_url;
        alert(this.responseMessage);
      },
      error: (error) => {
        this.responseMessage = error.error?.msg || 'Upload failed';
        alert(this.responseMessage);
      }
    });
  } else {
    alert('Please select a file before submitting.');
  }
}

}