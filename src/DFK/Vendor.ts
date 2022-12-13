import { Contract, Signer } from 'ethers';
import { VendorItem } from './models/VendorItem.js';

export class Vendor {
  constructor(private itemGoldTraderContract: Contract) {}

  async getItemByAddress(itemAddress: string): Promise<VendorItem> {
    const tradeItem = await this.itemGoldTraderContract.getTradeItemByAddress(itemAddress);

    // console.log(
    //   `player sell price: ${tradeItem.playerSellPrice}, min price: ${tradeItem.minPrice}, delta price increase: ${tradeItem.deltaPriceIncrease}, decrease rate: ${tradeItem.decreaseRate}, price increase decay: ${tradeItem.priceIncreaseDecay}, last purchase timestamp: ${tradeItem.lastPurchaseTimestamp}`
    // );

    const vendorItem: VendorItem = this.toVendorItem(tradeItem);

    return vendorItem;
  }

  async getItems(): Promise<VendorItem[]> {
    const tradeItems = await this.itemGoldTraderContract.getTradeItems().map((ti) => this.toVendorItem(ti));

    return tradeItems;
  }

  async sellItem(signer: Signer, itemAddress: string, quantity: number): Promise<void> {
    const result = await this.itemGoldTraderContract.connect(signer).sellItem(itemAddress, quantity);

    console.log(`sell item transaction submitted`);

    const receipt = await result.wait();

    console.log(`got sell item receipt ${receipt.transactionHash}`);
  }

  private toVendorItem(tradeItem): VendorItem {
    return {
      id: tradeItem.id,
      address: tradeItem.item,
      currentPrice: tradeItem.currentPrice,
      sellPrice: tradeItem.playerSellPrice,
      minPrice: tradeItem.minPrice,
      deltaPriceIncrease: tradeItem.deltaPriceIncrease,
      decreaseRate: tradeItem.decreaseRate,
      priceIncreaseDecay: tradeItem.priceIncreaseDecay,
      lastPurchaseTimestamp: new Date(tradeItem.lastPurchaseTimestamp * 1000)
    };
  }
}
