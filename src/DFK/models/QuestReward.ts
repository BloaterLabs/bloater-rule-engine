import { BigNumber } from 'ethers';
import { Item } from './Item';

export interface QuestReward {
  heroId: BigNumber;
  items: { amount: BigNumber; item: Item }[];
  skillUp: number;
  xp: BigNumber;
}
