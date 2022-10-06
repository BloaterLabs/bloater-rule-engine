import { BigNumber } from 'ethers';

// todo: terrible interface name but don't want to use Quest since it's already used
export interface QuestFromContract {
  attempts: number;
  completeAtTime: number;
  heroes: BigNumber[];
  id: BigNumber;
  level: number;
  player: string;
  questAddress: string;
  startAtTime: number;
  startBlock: number;
  status: number;
}
