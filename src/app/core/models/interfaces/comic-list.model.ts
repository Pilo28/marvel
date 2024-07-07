import { ComicSummary } from './comic-summary.model';

export interface ComicList {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicSummary[];
}
    