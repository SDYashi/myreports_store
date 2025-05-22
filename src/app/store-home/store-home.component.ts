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
}
