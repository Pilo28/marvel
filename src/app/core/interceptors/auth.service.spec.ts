import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HTTP_INTERCEPTORS, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { AuthInterceptor } from './auth.service';

describe('AuthInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let notificationServiceSpy: jasmine.SpyObj<NotificationService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    notificationServiceSpy = jasmine.createSpyObj('NotificationService', ['showError']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        { provide: NotificationService, useValue: notificationServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    // Establece valores en localStorage antes de cada test
    localStorage.setItem('authHash', 'testHash');
    localStorage.setItem('publicKey', 'testKey');
    localStorage.setItem('timestamp', '12345');
  });

  afterEach(() => {
    // Limpia localStorage después de cada test
    localStorage.removeItem('authHash');
    localStorage.removeItem('publicKey');
    localStorage.removeItem('timestamp');
    httpMock.verify();
  });

  it('should add auth parameters to the request', () => {
    httpClient.get('/test').subscribe(response => expect(response).toBeTruthy());

    const httpRequest = httpMock.expectOne((req: HttpRequest<any>) => 
      req.params.has('ts') && req.params.get('ts') === '12345' &&
      req.params.has('apikey') && req.params.get('apikey') === 'testKey' &&
      req.params.has('hash') && req.params.get('hash') === 'testHash'
    );

    expect(httpRequest.request.params.get('ts')).toBe('12345');
    expect(httpRequest.request.params.get('apikey')).toBe('testKey');
    expect(httpRequest.request.params.get('hash')).toBe('testHash');
  });

  it('should handle 401 error and navigate to home', () => {
    httpClient.get('/test').subscribe(
      response => fail('should have failed with the 401 error'),
      error => {
        expect(error).toBeTruthy();
        expect(notificationServiceSpy.showError).toHaveBeenCalledWith("You are not authorized to access this resource.");
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
      }
    );

    const httpRequest = httpMock.expectOne((req: HttpRequest<any>) => 
      req.url === '/test' &&
      req.params.has('ts') && req.params.get('ts') === '12345' &&
      req.params.has('apikey') && req.params.get('apikey') === 'testKey' &&
      req.params.has('hash') && req.params.get('hash') === 'testHash'
    );
    httpRequest.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should handle 403 error and navigate to home', () => {
    httpClient.get('/test').subscribe(
      response => fail('should have failed with the 403 error'),
      error => {
        expect(error).toBeTruthy();
        expect(notificationServiceSpy.showError).toHaveBeenCalledWith("You are not authorized to access this resource.");
        expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
      }
    );

    const httpRequest = httpMock.expectOne((req: HttpRequest<any>) => 
      req.url === '/test' &&
      req.params.has('ts') && req.params.get('ts') === '12345' &&
      req.params.has('apikey') && req.params.get('apikey') === 'testKey' &&
      req.params.has('hash') && req.params.get('hash') === 'testHash'
    );
    httpRequest.flush('Forbidden', { status: 403, statusText: 'Forbidden' });
  });

  it('should handle unknown error', () => {
    httpClient.get('/test').subscribe(
      response => fail('should have failed with an unknown error'),
      error => {
        expect(error).toBeTruthy();
        expect(notificationServiceSpy.showError).not.toHaveBeenCalled();
        expect(routerSpy.navigate).not.toHaveBeenCalled();
      }
    );

    const httpRequest = httpMock.expectOne((req: HttpRequest<any>) => 
      req.url === '/test' &&
      req.params.has('ts') && req.params.get('ts') === '12345' &&
      req.params.has('apikey') && req.params.get('apikey') === 'testKey' &&
      req.params.has('hash') && req.params.get('hash') === 'testHash'
    );
    httpRequest.flush('Unknown Error', { status: 500, statusText: 'Server Error' });
  });
});
