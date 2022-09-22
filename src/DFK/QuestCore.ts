import { Provider } from "@ethersproject/providers";
import { BigNumber, Contract, ContractReceipt, Overrides, Wallet } from "ethers"

import questCoreV2abi = require('./abis/QuestCoreV2.1.json');
import { ActiveQuest } from "./models/ActiveQuest";
import { Addresses } from "./models/Addresses/Addresses";

export class QuestCore {
    private questCoreContract: Contract;

    constructor(
        private addresses: Addresses, 
        provider: Provider,
        private wallet: Wallet) {
        this.questCoreContract = new Contract(addresses.contractAddresses.questCoreV2, questCoreV2abi, provider);
    }

    async completeQuest(heroId: BigNumber, overrides: Overrides = {}): Promise<void> {
        try {
           const result = await this.questCoreContract
                .connect(this.wallet)
                //.completeQuest(heroId, overrides);
                .completeQuest(heroId);

            console.log(`complete quest transaction submitted`);

            const receipt = await this.getReceipt(result);
            
            console.log(`got complete quest receipt ${ receipt.transactionHash }`);
        } catch(ex) {
            console.log(ex);
            console.log(`Error completing quest Code: ${ex.error?.code}, Reason: ${ex.error?.reason}, Method: ${ex.error?.method}`);
        }
    }

    async getActiveQuests(address: string): Promise<ActiveQuest[]> {
        const activeQuests: ActiveQuest[] = [];

        const activeQuestsOriginalv2 = await this.questCoreContract.getAccountActiveQuests(address);        
        
        activeQuestsOriginalv2.forEach(activeQuestOriginal => {
            const activeQuest = new ActiveQuest();
            activeQuest.completeAt = new Date(activeQuestOriginal.completeAtTime * 1000);
            activeQuest.attempts = activeQuestOriginal.attempts;
            activeQuest.heroes = activeQuestOriginal.heroes;
            activeQuest.id = activeQuestOriginal.id;
            activeQuest.level = activeQuestOriginal.level;
            activeQuest.player = activeQuestOriginal.player;
            activeQuest.questAddress = activeQuestOriginal.questAddress;
            activeQuest.quest =  this.getQuestName(activeQuestOriginal.questAddress);
            activeQuest.startAt = new Date(activeQuestOriginal.startAtTime * 1000);
            activeQuest.startBlock = activeQuestOriginal.startBlock;
            activeQuest.status = activeQuestOriginal.status;

            activeQuests.push(activeQuest);
        });        

        return activeQuests;
    }

    async getCompletedQuests(address: string): Promise<ActiveQuest[]> {
        const activeQuests = await this.getActiveQuests(address);

        return activeQuests.filter(q => q.isComplete);
    }

    getQuestName(address: string): string {
        for (const questName in this.addresses.questAddresses) {
            if (this.addresses.questAddresses[questName] === address) {
                return questName;
            }
        }
    }

    async startQuest(heroIds: BigNumber[], questAddress: string, attempts: number = 5, level: number = 0) {
        try {           
            const result = await this.questCoreContract
                .connect(this.wallet)
                //.completeQuest(heroId, overrides);
                .startQuest(heroIds, questAddress, attempts, level);

            console.log(`start quest ${this.getQuestName(questAddress)}`);

            const receipt = await this.getReceipt(result);
            
            console.log(`got receipt ${receipt.transactionHash}`);
        } catch(ex) {
            console.log(ex);
            console.log(`Error completing quest Code: ${ex.error?.code}, Reason: ${ex.error?.reason}, Method: ${ex.error?.method}`);
        }
    }

    private async getReceipt(tx): Promise<ContractReceipt> {
        try {
            const receipt = await tx.wait();
            //const receipt = await this.provider.getTransactionReceipt(tx.hash);
            //console.log(receipt, tx.hash);
            return receipt;
        } catch (ex) {
            console.log(`getReceipt failed for ${tx.hash}`, ex, tx);
        }
    }

    private delay(seconds: number): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(resolve, seconds * 1000);
        });
    }
}