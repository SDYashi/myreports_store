import { Component } from '@angular/core';

@Component({
  selector: 'app-uploadlab-qr',
  templateUrl: './uploadlab-qr.component.html',
  styleUrls: ['./uploadlab-qr.component.css']
})
export class UploadlabQrComponent {

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
      alert('Please select a file before submitting.');
      return;
    }
    // Process the file (e.g. upload to server or read locally)
    console.log('Submitting file:', this.selectedFile.name);
    // Example: You can add upload logic here or further processing
    alert('File submitted: ' + this.selectedFile.name);
  }
}
