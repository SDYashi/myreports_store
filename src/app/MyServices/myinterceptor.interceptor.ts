import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class MyinterceptorInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private loaderService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clonedRequest = req;

    const isFormData = req.body instanceof FormData;

    // Only set Content-Type to JSON if not FormData
    if (!isFormData) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
    }

    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      clonedRequest = clonedRequest.clone({
        setHeaders: {
          Authorization: `Bearer ${access_token}`
        }
      });
    }

    // Show loader before sending request
    this.loaderService.show();

    return next.handle(clonedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      }),
      finalize(() => {
        // Hide loader when request completes or errors out
        this.loaderService.hide();
      })
    );
  }
}