import { StorySummary } from './story-summary.model';

export interface StoryList {
  available: number;
  returned: number;
  collectionURI: string;
  items: StorySummary[];
}
