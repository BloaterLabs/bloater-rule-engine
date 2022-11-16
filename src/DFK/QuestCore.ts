import { BigNumber, Contract, ContractReceipt, Event, Signer } from 'ethers';

import { Addresses } from './models/Addresses/Addresses.js';
import { Quest, QuestReward } from './models/index.js';
import { QuestHelper } from './QuestHelper.js';
import { QuestFromContract } from './models/contracts/QuestFromContract.js';

export class QuestCore {
  constructor(private addresses: Addresses, private questCoreContract: Contract) {}

  async completeQuest(heroId: BigNumber, signer: Signer): Promise<Quest> {
    try {
      const result = await this.questCoreContract.connect(signer).completeQuest(heroId);

      console.log(`complete quest transaction submitted`);

      const receipt = await this.getReceipt(result);

      const quest = this.parseQuestReceipt(receipt);

      // todo: parse the result of this and log message with details similar to monitor but maybe not as much.
      console.log(`got complete quest receipt ${receipt.transactionHash}`);

      return quest;
    } catch (ex) {
      //console.log(ex);
      console.log(
        `Error completing quest Code: ${ex.error?.code}, Reason: ${ex.error?.reason}, Method: ${ex.error?.method}`
      );
    }
  }

  async getActiveQuests(address: string): Promise<Quest[]> {
    const activeQuests = await this.questCoreContract.getAccountActiveQuests(address);

    return activeQuests.map((ac: QuestFromContract) => new Quest(ac, this.addresses.questAddresses));
  }

  async getQuestCompletedEvents(address: string, fromBlock: number, toBlock: number): Promise<Quest[]> {
    const filterQuestCompleted = this.questCoreContract.filters.QuestCompleted(null, address);

    const questsCompleted = await this.questCoreContract.queryFilter(filterQuestCompleted, fromBlock, toBlock);

    return await this.convertQuestEventsToQuests(questsCompleted);
  }

  async getQuestStartedEvents(address: string, fromBlock: number, toBlock: number): Promise<Quest[]> {
    const filterQuestStarted = this.questCoreContract.filters.QuestStarted(null, address);

    const questsStarted = await this.questCoreContract.queryFilter(filterQuestStarted, fromBlock, toBlock);

    return await this.convertQuestEventsToQuests(questsStarted);
  }

  async getCompletableQuests(address: string): Promise<Quest[]> {
    const activeQuests = await this.getActiveQuests(address);

    return activeQuests.filter((q) => q.isCompletable);
  }

  parseStartQuestReceipt(receipt: ContractReceipt): Quest {
    receipt.logs.forEach((log) => {
      if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic('QuestStarted')) >= 0) {
        const event = this.questCoreContract.interface.parseLog(log);

        // todo: this feels awful
        const questFromContract = event.args as unknown as QuestFromContract;

        return new Quest(questFromContract, this.addresses.questAddresses);
      }
    });

    return null;
  }

  parseQuestReceipt(receipt: ContractReceipt): Quest {
    // todo: this will likely need to be reworked for multiquest.
    let quest: Quest;
    const rewards: QuestReward[] = [];

    for (const log of receipt.logs) {
      // todo: would be cool if we could tell up front if this log is one we want to use or not, but feels
      // inefficient to check them all first here and then again later.

      if (
        log.topics.indexOf(this.questCoreContract.interface.getEventTopic('QuestStarted')) >= 0 ||
        log.topics.indexOf(this.questCoreContract.interface.getEventTopic('QuestCompleted')) >= 0
      ) {
        if (quest != null) {
          // if we've already seen this event for this quest result.
          continue;
        }

        const event = this.questCoreContract.interface.parseLog(log);

        quest = new Quest(event.args.quest, this.addresses.questAddresses);
        continue;
      }

      if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic('QuestSkillUp')) >= 0) {
        const event = this.questCoreContract.interface.parseLog(log);

        const reward = this.getCreateHeroReward(rewards, event.args.heroId);
        reward.skillUp += event.args.skillUp;
        continue;
      }

      if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic('QuestXP')) >= 0) {
        const event = this.questCoreContract.interface.parseLog(log);

        const reward = this.getCreateHeroReward(rewards, event.args.heroId);
        reward.xp = reward.xp.add(event.args.xpEarned);
        continue;
      }

      if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic('RewardMinted')) >= 0) {
        const event = this.questCoreContract.interface.parseLog(log);

        const item = this.addresses.tokenAddresses.find((token) => token.address === event.args.reward);

        if (item == null) {
          console.log(`can't find item ${event.args.reward}`);
          console.log(event.args);
        }

        const reward = this.getCreateHeroReward(rewards, event.args.heroId);

        if (!reward.items.some((i) => i.item.address === item.address)) {
          reward.items.push({ amount: event.args.amount, item: item });
        } else {
          const rewardItem = reward.items.find((i) => i.item.address === item.address);
          rewardItem.amount = rewardItem.amount.add(event.args.amount);
        }
      }
    }

    // Add rewards to the quest
    quest.rewards = rewards;

    return quest;
  }

  async startQuest(
    heroIds: BigNumber[],
    questAddress: string,
    attempts: number,
    level: number,
    signer: Signer
  ): Promise<Quest> {
    try {
      const result = await this.questCoreContract.connect(signer).startQuest(heroIds, questAddress, attempts, level);

      const questName = QuestHelper.getQuestName(this.addresses.questAddresses, questAddress);
      console.log(`start ${heroIds.length} heroes on quest ${questName}, attempts: ${attempts}, level: ${level}`);

      const receipt = await this.getReceipt(result);

      console.log(`got receipt ${receipt.transactionHash}`);

      return this.parseStartQuestReceipt(receipt);
    } catch (ex) {
      //console.log(ex);
      console.log(
        `Error starting quest Code: ${ex.error?.code}, Reason: ${ex.error?.reason}, Method: ${ex.error?.method}`
      );
    }
  }

  onQuestCompleted(address: string, callback: (quest: Quest) => void): void {
    const filterQuestStarted = this.questCoreContract.filters.QuestCompleted(null, address);
    const transactionHashes: string[] = [];

    // note: not sure if right argument names here, but I need the 5th one.
    this.questCoreContract.on(filterQuestStarted, async (from, to, amount, eventArgs, event: Event) => {
      // need to check for dupes because this fires for every hero in quest.
      if (transactionHashes.indexOf(event.transactionHash) >= 0) {
        // we've seen this transaction before. skip it.
        return;
      }

      transactionHashes.push(event.transactionHash);

      const receipt = await event.getTransactionReceipt();
      const quest = this.parseQuestReceipt(receipt);

      // todo: cleaner way to make sure the transactionHashes array doesn't get too long?
      // Better way to check for dupes or a way around this?
      if (transactionHashes.length > 50) {
        transactionHashes.shift();
      }

      callback(quest);
    });
  }

  /**
   * This method is to give ability for a callback to be called when the QuestStarted event is raised for the passed in address.
   */
  onQuestStarted(address: string, callback: (quest: Quest) => void): void {
    const filterQuestStarted = this.questCoreContract.filters.QuestStarted(null, address);
    const questIds = [];

    // note: not sure if right argument names here, but I need the 4th one.
    this.questCoreContract.on(filterQuestStarted, async (from, to, amount, eventArgs) => {
      const quest = new Quest(eventArgs, this.addresses.questAddresses);

      // need to check for dupes because this fires for every hero in quest.
      if (questIds.indexOf(quest.id.toNumber()) >= 0) {
        return;
      }

      // todo: cleaner way to make sure the questIds array doesn't get too long?
      // Better way to check for dupes or a way around this?
      if (questIds.length > 50) {
        questIds.shift();
      }

      questIds.push(quest.id.toNumber());
      callback(quest);
    });
  }

  private async convertQuestEventsToQuests(questEvents: Event[]): Promise<Quest[]> {
    const quests: Quest[] = [];
    const transactionHashes = [];
    for (const questEvent of questEvents) {
      if (transactionHashes.indexOf(questEvent.transactionHash) >= 0) {
        // we've seen this transaction before. Skip it.
        continue;
      }

      transactionHashes.push(questEvent.transactionHash);

      const receipt = await questEvent.getTransactionReceipt();
      const quest = this.parseQuestReceipt(receipt);

      quests.push(quest);
    }

    return quests;
  }

  private getCreateHeroReward(rewards: QuestReward[], heroId: BigNumber) {
    let reward: QuestReward = rewards.find((r) => r.heroId.eq(heroId));

    if (!reward) {
      reward = {
        heroId: heroId,
        items: [],
        skillUp: 0,
        xp: BigNumber.from(0)
      };

      // add it to the rewards collection
      rewards.push(reward);
    }

    return reward;
  }

  private async getReceipt(tx): Promise<ContractReceipt> {
    try {
      // todo: need to figure out a better way to handle these when they seem to wait for a long time.
      const receipt = await tx.wait();

      return receipt;
    } catch (ex) {
      console.log(`getReceipt failed for ${tx.hash}`, ex, tx);
    }
  }
}
