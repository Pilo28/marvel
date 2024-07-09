import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';


@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService, private router :Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHash = localStorage.getItem('authHash');
    const publicKey = localStorage.getItem('publicKey');
    const timestamp = localStorage.getItem('timestamp');
    
    const authReq = req.clone({
      setParams: {
        ts: timestamp ?? '',
        apikey: publicKey ?? '',
        hash: authHash ?? ''
      }
    });
    
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `An error occurred: ${error.error.message}`;
        } else {
          errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
        }
        console.error(errorMessage);
            
        if (error.status === 401 || error.status === 403) {
          this.notificationService.showError("You are not authorized to access this resource.");
          this.router.navigate(['/home']); 
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
