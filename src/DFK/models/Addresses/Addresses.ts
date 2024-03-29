import { Item } from '../Item.js';
import { ContractAddresses } from './ContractAddresses.js';
import { QuestAddresses } from './QuestAddresses.js';

export interface Addresses {
  readonly contractAddresses: ContractAddresses;
  readonly none: string;
  readonly questAddresses: QuestAddresses;
  readonly tokenAddresses: Item[];
}
