import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { MarvelResponse } from '../models/interfaces/marvel-response.model';
import { Series } from '../models/interfaces/series.model';
import { Comic } from '../models/interfaces/comic.model';

@Injectable({
  providedIn: 'root'
})
export class MarvelService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getSeries(): Observable<MarvelResponse<Series>> {
    return this.http.get<MarvelResponse<Series>>(`${this.apiUrl}/series`).pipe(
      catchError(this.handleError)
    );
  }

  getComics(seriesId: string): Observable<MarvelResponse<Comic>> {
    return this.http.get<MarvelResponse<Comic>>(`${this.apiUrl}/series/${seriesId}/comics`).pipe(
      catchError(this.handleError)
    );
  }

  getComic(comicId: string): Observable<MarvelResponse<Comic>> {
    return this.http.get<MarvelResponse<Comic>>(`${this.apiUrl}/comics/${comicId}`).pipe(
      catchError(this.handleError)
    );
  }
  
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `An error occurred: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
