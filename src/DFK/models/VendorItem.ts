import { BigNumber } from 'ethers';

export interface VendorItem {
  id: number;

  /**
   * The address of the item that is being referenced.
   */
  address: string;

  currentPrice: BigNumber;

  sellPrice: BigNumber;

  minPrice: BigNumber;

  deltaPriceIncrease: BigNumber;

  decreaseRate: BigNumber;

  priceIncreaseDecay: BigNumber;

  lastPurchaseTimestamp: Date;
}
