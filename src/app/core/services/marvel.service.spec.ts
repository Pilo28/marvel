import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MarvelService } from './marvel.service';
import { environment } from '../../../environments/environment';
import { MarvelResponse } from '../models/interfaces/marvel-response.model';
import { Series } from '../models/interfaces/series.model';
import { Comic } from '../models/interfaces/comic.model';

describe('MarvelService', () => {
  let service: MarvelService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl;
  
  const mockSeriesResponse: MarvelResponse<Series> = {
    data: {
      results: [{
        id: 1, title: 'Series 1', description: 'Description of Series 1',
        resourceURI: '',
        urls: [],
        startYear: 0,
        endYear: 0,
        rating: '',
        modified: '',
        thumbnail: undefined,
        comics: undefined
      }],
      offset: 0,
      limit: 0,
      total: 0,
      count: 0
    },
    code: 0,
    status: ''
  };
  const mockComicResponse: MarvelResponse<Comic> = {
    data: {
      results: [{
        id: 1, title: 'Comic 1', description: 'Description of Comic 1', issueNumber: 1,
        digitalId: 0,
        variantDescription: '',
        modified: '',
        isbn: '',
        upc: '',
        diamondCode: '',
        ean: '',
        issn: '',
        format: '',
        pageCount: 0,
        textObjects: [],
        resourceURI: '',
        urls: [],
        series: undefined,
        variants: [],
        collections: [],
        collectedIssues: [],
        dates: [],
        prices: [],
        thumbnail: undefined,
        images: [],
        creators: undefined,
        characters: undefined,
        stories: undefined,
        events: undefined
      }],
      offset: 0,
      limit: 0,
      total: 0,
      count: 0
    },
    code: 0,
    status: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MarvelService]
    });
    service = TestBed.inject(MarvelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch series', () => {
    service.getSeries().subscribe((response) => {
      expect(response).toEqual(mockSeriesResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/series`);
    expect(req.request.method).toBe('GET');
    req.flush(mockSeriesResponse);
  });

  it('should fetch comics by series id', () => {
    const seriesId = '1';
    service.getComics(seriesId).subscribe((response) => {
      expect(response).toEqual(mockComicResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/series/${seriesId}/comics`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComicResponse);
  });

  it('should fetch a single comic by comic id', () => {
    const comicId = '1';
    service.getComic(comicId).subscribe((response) => {
      expect(response).toEqual(mockComicResponse);
    });

    const req = httpMock.expectOne(`${apiUrl}/comics/${comicId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockComicResponse);
  });

  it('should handle an error response', () => {
    service.getSeries().subscribe(
      () => fail('expected an error, not series'),
      (error: Error) => {
        expect(error.message).toContain('Server returned code: 500');
      }
    );

    const req = httpMock.expectOne(`${apiUrl}/series`);
    req.flush('Something went wrong', { status: 500, statusText: 'Server Error' });
  });
});
