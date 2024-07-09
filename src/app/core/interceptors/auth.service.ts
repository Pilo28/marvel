import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
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
    return next.handle(authReq);
  }
}
