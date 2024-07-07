
import { MarvelDataContainer } from './marvel-data-container.model';

export interface MarvelResponse<T> {
  code: number;
  status: string;
  data: MarvelDataContainer<T>;
}
