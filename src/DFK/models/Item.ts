export interface Item {
  color?: string; // note: trying this out. I might remove, hasn't worked the best and might be better suited for clients to decide themselves.

  address: string;

  symbol: string;

  /**
   * This is a property because of different items using different contracts, most use the erc20 but there is
   * also the power token(correct term?) which will have nothing set or Eternal Story(is this is a standard erc token?).
   */
  contract?: string;

  decimals: number;

  name: string;

  uri?: number;

  vendorValue: number;
}
