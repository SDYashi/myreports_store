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
import { UploadlabQrComponent } from './uploadlab-qr/uploadlab-qr.component';
import { UploadlabWzlogoComponent } from './uploadlab-wzlogo/uploadlab-wzlogo.component';
import { StoreChangepasswordComponent } from './store-changepassword/store-changepassword.component';
import { StoreAddReviewerEmployeeComponent } from './store-add-reviewer-employee/store-add-reviewer-employee.component';
import { AuthGuard } from './MyServices/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: StoreLoginComponent },
  {
    path: 'store-home',
    component: StoreHomeComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'store-generate-reports', pathMatch: 'full' },
      { path: 'store-generate-reports', component: StoreGenerateReportsComponent },
      { path: 'store-view-reports', component: StoreViewReportsComponent },
      { path: 'store-edit-reports',component:StoreEditReportsComponent},
      { path: 'store-edit-userprofiles',component:StoreEditUserProfileComponent},
      { path: 'store-add-ref-standards',component:StoreAddRefStandaredsComponent},
      { path: 'store-add-customer-name-addrs',component:StoreAddCustomerNameAddrsComponent},
      { path: 'store-add-job-rating',component:StoreAddJobRatingComponent},
      { path: 'store-upload-lab-qr',component:UploadlabQrComponent},
      { path: 'store-upload-wz-logo',component:UploadlabWzlogoComponent},
      {path:'store-changepassword',component:StoreChangepasswordComponent},
      {path:'store-add-tester-employee',component:StoreAddReviewerEmployeeComponent},
     { path: 'store-home/store-edit-reports/:samplecode', component: StoreEditReportsComponent }




    ]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
