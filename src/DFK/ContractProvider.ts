import { Contract } from 'ethers';
import { ContractAddresses } from './models/Addresses/ContractAddresses';
import { Provider } from '@ethersproject/providers';
import questCoreV2abi = require('./abis/QuestCoreV2.1.json');
import heroCoreAbi = require('./abis/HeroCore.json');

export class ContractProvider {
  constructor(private contractAddresses: ContractAddresses, private provider: Provider) {}

  getHeroCoreContract(): Contract {
    const heroCoreContract = new Contract(this.contractAddresses.heroCore, heroCoreAbi, this.provider);

    return heroCoreContract;
  }

  getQuestCoreContract(): Contract {
    const questCoreContract = new Contract(this.contractAddresses.questCoreV2, questCoreV2abi, this.provider);

    return questCoreContract;
  }
}
