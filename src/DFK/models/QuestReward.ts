import { BigNumber } from 'ethers';
import { Item } from './Item.js';

export interface QuestReward {
  heroId: BigNumber;
  items: { amount: BigNumber; item: Item }[];
  skillUp: number;
  xp: BigNumber;
}
