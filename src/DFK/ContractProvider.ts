import { Contract } from 'ethers';
import { ContractAddresses } from './models/Addresses/ContractAddresses';
import { Provider } from '@ethersproject/providers';
import questCoreV2abi = require('./abis/QuestCoreV2.1.json');
import heroCoreAbi = require('./abis/HeroCore.json');
import eternalStoryAbi = require('./abis/EternalStory.json');
import inventoryItem = require('./abis/InventoryItem.json');

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
    const itemContract = new Contract(itemAddress, inventoryItem, this.provider);

    return itemContract;
  }

  getQuestCoreContract(): Contract {
    const questCoreContract = new Contract(this.contractAddresses.questCoreV2, questCoreV2abi, this.provider);

    return questCoreContract;
  }
}
