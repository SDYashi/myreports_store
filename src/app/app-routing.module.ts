import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreLoginComponent } from './store-login/store-login.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { StoreGenerateReportsComponent } from './store-generate-reports/store-generate-reports.component';
import { StoreViewReportsComponent } from './store-view-reports/store-view-reports.component';
import { StoreEditReportsComponent } from './store-edit-reports/store-edit-reports.component';
import { StoreAddCustomerNameAddrsComponent } from './store-add-customer-name-addrs/store-add-customer-name-addrs.component';
import { StoreAddJobRatingComponent } from './store-add-job-rating/store-add-job-rating.component';
import { StoreEditUserProfileComponent } from './store-edit-user-profile/store-edit-user-profile.component';
import { StoreAddRefStandaredsComponent } from './store-add-ref-standareds/store-add-ref-standareds.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: StoreLoginComponent },
  {
    path: 'store-home',
    component: StoreHomeComponent,
    children: [
      { path: '', redirectTo: 'store-generate-reports', pathMatch: 'full' },
      { path: 'store-generate-reports', component: StoreGenerateReportsComponent },
      { path: 'store-view-reports', component: StoreViewReportsComponent },
      { path: 'store-edit-reports',component:StoreEditReportsComponent},
      { path: 'store-edit-userprofiles',component:StoreEditUserProfileComponent},
      { path: 'store-add-ref-standards',component:StoreAddRefStandaredsComponent},
      { path: 'store-add-customer-name-addrs',component:StoreAddCustomerNameAddrsComponent},
      { path: 'store-add-job-rating',component:StoreAddJobRatingComponent},


    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
