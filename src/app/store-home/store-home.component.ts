import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.css']
})
export class StoreHomeComponent {
  username_profie: string='';
  constructor(private router: Router) { }
  
  ngOnInit(): void {
  //  this.username_profie = this.getUserNameFromToken();
  //  alert(this.username_profie);
  }

logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

viewprofile(){
  this.router.navigate(['store-home/store-edit-userprofiles']);
}
changepassword(){
  this.router.navigate(['store-home/store-changepassword']);
}

  getUserNameFromToken(): string {
    const token = localStorage.getItem('access_token');
    if (!token) {
      return '';
    }
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      return '';
    }
    const payload = JSON.parse(atob(tokenParts[1]));
    return payload.username;
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
