import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
    return this.http.get<MarvelResponse<Series>>(`${this.apiUrl}/series`);
  }

  getComics(seriesId: string): Observable<MarvelResponse<Comic>> {
    return this.http.get<MarvelResponse<Comic>>(`${this.apiUrl}/series/${seriesId}/comics`);
  }

  getComic(comicId: string): Observable<MarvelResponse<Comic>> {
    return this.http.get<MarvelResponse<Comic>>(`${this.apiUrl}/comics/${comicId}`);
  }
}
