import { Contract } from 'ethers';
import { ContractAddresses } from './models/Addresses/ContractAddresses.js';
import { Provider } from '@ethersproject/providers';
import questCoreV2Abi = require('./abis/QuestCoreV2.1.json');
import heroAuctionUpgradeable = require('./abis/HeroAuctionUpgradeable.json');
import heroCoreAbi = require('./abis/HeroCore.json');
import erc20Abi = require('../erctokens/abis/ERC20.json');
import eternalStoryAbi = require('./abis/EternalStory.json');
import itemGoldTraderAbi = require('./abis/ItemGoldTraderV2.json');
import meditationCircleAbi = require('./abis/MeditationCircle.json');
import uniswapv2FactoryAbi = require('../uniswap/abis/Uniswapv2Factory.json');
import uniswapv2RouterAbi = require('../uniswap/abis/Uniswapv2Router.json');

export class ContractProvider {
  constructor(private contractAddresses: ContractAddresses, private provider: Provider) {}

  getERC20Contract(tokenAddress): Contract {
    const ercContract = new Contract(tokenAddress, erc20Abi, this.provider);

    return ercContract;
  }

  getEternalStoryContract(): Contract {
    const eternalStoryContract = new Contract(this.contractAddresses.eternalStory, eternalStoryAbi, this.provider);

    return eternalStoryContract;
  }

  getHeroAuctionContract(): Contract {
    const heroAuctionContract = new Contract(this.contractAddresses.heroAuction, heroAuctionUpgradeable, this.provider);

    return heroAuctionContract;
  }

  getHeroCoreContract(): Contract {
    const heroCoreContract = new Contract(this.contractAddresses.heroCore, heroCoreAbi, this.provider);

    return heroCoreContract;
  }

  getItemGoldTraderContract(): Contract {
    const itemGoldTraderContract = new Contract(
      this.contractAddresses.itemGoldTraderV2,
      itemGoldTraderAbi,
      this.provider
    );

    return itemGoldTraderContract;
  }

  getMeditationCircleContract(): Contract {
    const meditationCircleContract = new Contract(
      this.contractAddresses.meditationCircle,
      meditationCircleAbi,
      this.provider
    );

    return meditationCircleContract;
  }

  getQuestCoreContract(): Contract {
    const questCoreContract = new Contract(this.contractAddresses.questCoreV2, questCoreV2Abi, this.provider);

    return questCoreContract;
  }

  getUniswapFactoryContract(): Contract {
    const factoryContract = new Contract(this.contractAddresses.uniswapV2Factory, uniswapv2FactoryAbi, this.provider);

    return factoryContract;
  }

  getUniswapRouterContract(): Contract {
    const routerContract = new Contract(this.contractAddresses.uniswapV2Router, uniswapv2RouterAbi, this.provider);

    return routerContract;
  }
}
