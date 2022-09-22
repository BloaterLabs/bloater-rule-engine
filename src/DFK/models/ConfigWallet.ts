export interface ConfigWallet {
    address: string;

    chainId: number;

    rpc: string; //todo: probably should make this an array so we can loop through them if things fail.

    walletPath: string;
}