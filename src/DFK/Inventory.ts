import { BigNumber, Contract, ethers } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { ContractProvider } from './ContractProvider.js';
import { Item } from './models/index.js';

export class Inventory {
  constructor(private contractProvider: ContractProvider, private provider: Provider) {}

  async getItemBalance(walletAddress: string, item: Item): Promise<string> {
    let itemContract: Contract;

    let balance: BigNumber;

    switch (item.contract ? item.contract.toLowerCase() : null) {
      case 'eternalstory':
        itemContract = this.contractProvider.getEternalStoryContract();
        balance = await itemContract.balanceOf(walletAddress, item.uri);
        break;
      case 'erc20':
        itemContract = this.contractProvider.getERC20Contract(item.address);
        balance = await itemContract.balanceOf(walletAddress);
        break;
      default:
        balance = await this.provider.getBalance(walletAddress);
        break;
    }

    // todo: I'm thinking we probably don't want to format this here and send out the bigNumber.
    return ethers.utils.formatUnits(balance, item.decimals);
  }

  async getItemBalances(walletAddress: string, items: Item[]): Promise<{ balance: string; item: Item }[]> {
    const itemBalances: { balance: string; item: Item }[] = [];

    const itemPromises = items.map((i) => this.getItemBalance(walletAddress, i));

    return Promise.all(itemPromises).then((balances: string[]) => {
      for (let i = 0; i < balances.length; i++) {
        itemBalances.push({ balance: balances[i], item: items[i] });
      }

      return itemBalances;
    });
  }

  async getTotalSupply(itemAddress: string): Promise<number> {
    // todo: fix yo.
    return 0;
  }
}
