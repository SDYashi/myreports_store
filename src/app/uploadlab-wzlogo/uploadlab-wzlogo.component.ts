import { Component } from '@angular/core';

@Component({
  selector: 'app-uploadlab-wzlogo',
  templateUrl: './uploadlab-wzlogo.component.html',
  styleUrls: ['./uploadlab-wzlogo.component.css']
})
export class UploadlabWzlogoComponent {

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
    // Process the file (upload or other logic)
    console.log('Submitting file:', this.selectedFile.name);
    alert('File submitted: ' + this.selectedFile.name);
  }
}
