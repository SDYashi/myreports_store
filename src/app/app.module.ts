import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreLoginComponent } from './store-login/store-login.component';
import { StoreGenerateReportsComponent } from './store-generate-reports/store-generate-reports.component';
import { StoreViewReportsComponent } from './store-view-reports/store-view-reports.component';
import { StoreHomeComponent } from './store-home/store-home.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MyinterceptorInterceptor } from './MyServices/myinterceptor.interceptor';
import { StoreEditReportsComponent } from './store-edit-reports/store-edit-reports.component';
import { StoreEditUserProfileComponent } from './store-edit-user-profile/store-edit-user-profile.component';
import { StoreAddCustomerNameAddrsComponent } from './store-add-customer-name-addrs/store-add-customer-name-addrs.component';
import { StoreAddJobRatingComponent } from './store-add-job-rating/store-add-job-rating.component';
import { StoreAddRefStandaredsComponent } from './store-add-ref-standareds/store-add-ref-standareds.component';

@NgModule({
  declarations: [
    AppComponent,
    StoreLoginComponent,
    StoreGenerateReportsComponent,
    StoreViewReportsComponent,
    StoreHomeComponent,
    StoreEditReportsComponent,
    StoreEditUserProfileComponent,
    StoreAddCustomerNameAddrsComponent,
    StoreAddJobRatingComponent,
    StoreAddRefStandaredsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MyinterceptorInterceptor,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
