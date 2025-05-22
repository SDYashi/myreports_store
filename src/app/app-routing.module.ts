import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreLoginComponent } from './store-login/store-login.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { StoreGenerateReportsComponent } from './store-generate-reports/store-generate-reports.component';
import { StoreViewReportsComponent } from './store-view-reports/store-view-reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: StoreLoginComponent },
  { path: 'store-home', component: StoreHomeComponent },
  { path: 'store-generate-reports', component: StoreGenerateReportsComponent },
  { path: 'store-view-reports', component: StoreViewReportsComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
