import { Component } from '@angular/core';
import { StoreServicesService } from '../MyServices/store-services.service';

@Component({
  selector: 'app-uploadlab-qr',
  templateUrl: './uploadlab-qr.component.html',
  styleUrls: ['./uploadlab-qr.component.css']
})
export class UploadlabQrComponent {
  selectedFile: File | null = null;
  imageUrl: string | null = null;
  uploadSuccess = false;

  constructor(private storeServices: StoreServicesService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Optional preview
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);

      console.log('Selected file:', file.name);
    }
  }

uploadImage(): void {
    if (!this.selectedFile) {
        alert('Please select a file first');
        return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    // Debug form data keys
    formData.forEach((val, key) => {
        console.log(`FormData key: ${key}`, val);
    });

    this.storeServices.uploadqrimage(formData).subscribe({
        next: (response) => {
            this.uploadSuccess = true;
            this.imageUrl = response.image_url || null; 
            console.log('Upload success:', response);
        },
        error: (error) => {
            this.uploadSuccess = false;
            console.error('Upload failed:', error);
        }
    });
}

}
