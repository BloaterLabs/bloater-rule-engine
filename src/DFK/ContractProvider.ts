import { Contract } from 'ethers';
import { ContractAddresses } from './models/Addresses/ContractAddresses.js';
import { Provider } from '@ethersproject/providers';
import questCoreV2Abi = require('./abis/QuestCoreV2.1.json');
import heroCoreAbi = require('./abis/HeroCore.json');
import eternalStoryAbi = require('./abis/EternalStory.json');
import inventoryItemAbi = require('./abis/InventoryItem.json');
import itemGoldTraderAbi = require('./abis/ItemGoldTraderV2.json');

export class ContractProvider {
  constructor(private contractAddresses: ContractAddresses, private provider: Provider) {}

  getEternalStoryContract(): Contract {
    const eternalStoryContract = new Contract(this.contractAddresses.eternalStory, eternalStoryAbi, this.provider);

    return eternalStoryContract;
  }

  getHeroCoreContract(): Contract {
    const heroCoreContract = new Contract(this.contractAddresses.heroCore, heroCoreAbi, this.provider);

    return heroCoreContract;
  }

  getItemContract(itemAddress: string): Contract {
    const itemContract = new Contract(itemAddress, inventoryItemAbi, this.provider);

    return itemContract;
  }

  getItemGoldTraderContract(): Contract {
    const itemGoldTraderContract = new Contract(
      this.contractAddresses.itemGoldTraderV2,
      itemGoldTraderAbi,
      this.provider
    );

    return itemGoldTraderContract;
  }

  getQuestCoreContract(): Contract {
    const questCoreContract = new Contract(this.contractAddresses.questCoreV2, questCoreV2Abi, this.provider);

    return questCoreContract;
  }
}
