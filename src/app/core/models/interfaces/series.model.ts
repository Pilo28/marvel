// src/app/core/models/series.model.ts
import { Url } from './url.model';
import { Image } from './image.model';
import { ComicList } from './comic-list.model';

export interface Series {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: Url[];
  startYear: number;
  endYear: number;
  rating: string;
  modified: string;
  thumbnail: Image;
  comics: ComicList;
}
