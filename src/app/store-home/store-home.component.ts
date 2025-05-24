import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.css']
})
export class StoreHomeComponent {
  constructor(private router: Router) { }
logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

toggleSidebar(): void {
    const sidebar = document.getElementById('sidebar') as HTMLElement | null;
    const mainContent = document.getElementById('main-content') as HTMLElement | null;
    if (!sidebar || !mainContent) {
      console.warn('Sidebar or main content element not found');
      return;
    }
    if (sidebar.style.display === 'none' || sidebar.style.display === '') {
      sidebar.style.display = 'block';
      // mainContent.style.marginLeft = '280px'; // Adjust this value based on sidebar width
    } else {
      sidebar.style.display = 'none';
      mainContent.style.marginLeft = '0'; // Reset margin when sidebar is hidden
    }
  }


}
