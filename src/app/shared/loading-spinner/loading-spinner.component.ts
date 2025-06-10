import { Component } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  loading = false;

  constructor(private loadingService: LoadingService) {
    this.loadingService.loading$.subscribe(status => {
      this.loading = status;
    });
  }
}
