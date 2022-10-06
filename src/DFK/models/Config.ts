import { ConfigWallet } from './ConfigWallet';

export interface Config {
  /**
   * Currently should be ~115 for harmony 2 for dfk.
   */
  gasPrice: number;

  /**
   * Current valid options. Harmony, DFKChain.
   */
  network: string;

  wallet: ConfigWallet;
}
