import { CreatorSummary } from './creator-summary.model';

export interface CreatorList {
  available: number;
  returned: number;
  collectionURI: string;
  items: CreatorSummary[];
}
