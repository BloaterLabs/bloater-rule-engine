export interface Item {
  // color: string; // if we want to give a color for logs.
  address: string;

  abbreviation: string;

  /**
   * This is a property because of different items using different contracts, most use the InventoryItem but there is
   * also the power token which will have nothing set or Eternal Story.
   */
  contract?: string;

  decimals: number;

  name: string;

  uri?: number;

  // quantity: number; // I think this might need to be a big number. Having this on an item feels weird but think it would be annoying keeping track elsewhere.
  vendorValue: number;
}
