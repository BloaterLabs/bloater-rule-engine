import { BigNumber } from 'ethers';
import { QuestHelper } from '../QuestHelper';
import { QuestAddresses } from './Addresses/QuestAddresses';
import { QuestFromContract } from './contracts/QuestFromContract';
import { QuestReward } from './QuestReward';

export class Quest {
  address: string;
  attempts: number;
  completeAt: Date;
  heroes: BigNumber[];
  id: BigNumber;
  level: number;
  name: string;
  player: string;
  rewards?: QuestReward[];
  startBlock: number;
  startAt: Date;
  status: number; // need to figure out what the different status are. 1 Started?

  get isCompletable(): boolean {
    return this.completeAt.valueOf() < Date.now(); // todo: probably should be checking the status as well?
  }

  constructor(questEvent: QuestFromContract, questAddresses: QuestAddresses) {
    this.attempts = questEvent.attempts;
    this.completeAt = new Date(questEvent.completeAtTime * 1000);
    this.heroes = questEvent.heroes;
    this.id = questEvent.id;
    this.level = questEvent.level;
    this.player = questEvent.player;
    this.address = questEvent.questAddress;
    this.name = QuestHelper.getQuestName(questAddresses, questEvent.questAddress);
    this.startAt = new Date(questEvent.startAtTime * 1000);
    this.startBlock = questEvent.startBlock;
    this.status = questEvent.status;
  }
}
