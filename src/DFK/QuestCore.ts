import { Provider } from "@ethersproject/providers";
import { BigNumber, Contract, ContractReceipt, Wallet } from "ethers"

import questCoreV2abi = require('./abis/QuestCoreV2.1.json');
import { Addresses } from "./models/Addresses/Addresses";
import { Quest, QuestReward } from "./models";
import { QuestHelper } from "./QuestHelper";

export class QuestCore {
    private questCoreContract: Contract;

    constructor(
        private addresses: Addresses, 
        provider: Provider,
        private wallet: Wallet) {
        this.questCoreContract = new Contract(addresses.contractAddresses.questCoreV2, questCoreV2abi, provider);
    }

    async completeQuest(heroId: BigNumber): Promise<Quest> {
        try {
           const result = await this.questCoreContract
                .connect(this.wallet)
                .completeQuest(heroId);

            console.log(`complete quest transaction submitted`);

            const receipt = await this.getReceipt(result);
            
            const quest = this.parseQuestReceipt(receipt);

            console.log(`got complete quest receipt ${ receipt.transactionHash }`);

            return quest;
        } catch(ex) {
            //console.log(ex);
            console.log(`Error completing quest Code: ${ex.error?.code}, Reason: ${ex.error?.reason}, Method: ${ex.error?.method}`);
        }
    }

    async getActiveQuests(address: string): Promise<Quest[]> {
        const activeQuests = await this.questCoreContract.getAccountActiveQuests(address);        
        
        return activeQuests.map((ac: any) => new Quest(ac, this.addresses.questAddresses));
    }

    async getCompletableQuests(address: string): Promise<Quest[]> {
        const activeQuests = await this.getActiveQuests(address);

        return activeQuests.filter(q => q.isCompletable);
    }

    parseStartQuestReceipt(receipt: ContractReceipt): Quest {

        receipt.logs.forEach((log) => {
            if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic("QuestStarted")) >= 0) {
                const event = this.questCoreContract.interface.parseLog(log);
                
                return new Quest(event.args, this.addresses.questAddresses);
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

            if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic("QuestStarted")) >= 0 ||
                log.topics.indexOf(this.questCoreContract.interface.getEventTopic("QuestCompleted")) >= 0) {
                if (quest != null) {
                    // if we've already seen this event for this quest result.
                    continue;
                }

                const event = this.questCoreContract.interface.parseLog(log);
                
                quest = new Quest(event.args.quest, this.addresses.questAddresses);
                continue;
            } 
            
            if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic("QuestSkillUp")) >= 0) {
                const event = this.questCoreContract.interface.parseLog(log);

                const reward = this.getCreateHeroReward(rewards, event.args.heroId);
                reward.skillUp += event.args.skillUp;
                continue;
            } 
            
            if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic("QuestXP")) >= 0) {
                const event = this.questCoreContract.interface.parseLog(log);

                const reward = this.getCreateHeroReward(rewards, event.args.heroId);
                reward.xp = reward.xp.add(event.args.xpEarned);
                continue;
            } 
            
            if (log.topics.indexOf(this.questCoreContract.interface.getEventTopic("RewardMinted")) >= 0) {
                const event = this.questCoreContract.interface.parseLog(log);

                const item = this.addresses.tokenAddresses.find(token => token.address === event.args.reward);

                if (item == null) {
                    console.log(`can't find item ${event.args.reward}`);
                    console.log(event.args);
                }

                const reward = this.getCreateHeroReward(rewards, event.args.heroId);

                if (!reward.items.some(i => i.item.address === item.address)) {
                    reward.items.push({ amount: event.args.amount, item: item });
                } else {
                    const rewardItem = reward.items.find(i => i.item.address === item.address);
                    rewardItem.amount = rewardItem.amount.add(event.args.amount);
                }
            }
        }

        // Add rewards to the quest
        quest.rewards = rewards;

        return quest;
    }

    async startQuest(heroIds: BigNumber[], questAddress: string, attempts: number = 5, level: number = 0) {
        try {           
            const result = await this.questCoreContract
                .connect(this.wallet)
                .startQuest(heroIds, questAddress, attempts, level);

            console.log(`start quest ${QuestHelper.getQuestName(this.addresses.questAddresses, questAddress)}`);

            const receipt = await this.getReceipt(result);
            
            console.log(`got receipt ${receipt.transactionHash}`);
        } catch(ex) {
            //console.log(ex);
            console.log(`Error completing quest Code: ${ex.error?.code}, Reason: ${ex.error?.reason}, Method: ${ex.error?.method}`);
        }
    }

    private getCreateHeroReward(rewards: QuestReward[], heroId: BigNumber) {
        let reward: QuestReward = rewards.find(r => r.heroId.eq(heroId));

        if (!reward) {
            reward = {
                heroId: heroId,
                items: [],
                skillUp: 0,
                xp: BigNumber.from(0)
            }

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