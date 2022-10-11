export interface Item {
  color?: string; // note: trying this out. I might remove, hasn't worked the best and might be better suited for clients to decide themselves.

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

  vendorValue: number;
}
