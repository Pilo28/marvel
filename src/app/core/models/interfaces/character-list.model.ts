import { CharacterSummary } from './character-summary.model';

export interface CharacterList {
  available: number;
  returned: number;
  collectionURI: string;
  items: CharacterSummary[];
}
