import { BigNumber, Contract, Signer } from 'ethers';

export class HeroAuction {
  constructor(private heroAuctionContract: Contract) {}

  async buyHero(signer: Signer, tokenId: BigNumber, amount: BigNumber) {
    const result = await this.heroAuctionContract.connect(signer).bid(tokenId, amount);

    await result.wait();

    // todo: let's get something better to log or not log at all.
    console.log(`bought hero ${tokenId}`);
  }

  async cancelAuction(signer: Signer, tokenId: BigNumber) {
    const result = await this.heroAuctionContract.connect(signer).cancelAuction(tokenId);

    await result.wait();

    // todo: let's get something better to log.
    console.log(`canceled auction`);
  }

  /**
   * Use this method to create Auctions.
   *
   * @param signer The wallet you want to use to sign.
   * @param tokenId the heroId
   * @param startingPrice
   * @param endingPrice
   * @param duration
   * @param winner
   */
  async createAuction(
    signer: Signer,
    tokenId: BigNumber,
    startingPrice: BigNumber,
    endingPrice: BigNumber,
    duration: number,
    winner: string
  ) {
    // default ending price to starting price if it's not set.
    endingPrice = endingPrice != null ? endingPrice : startingPrice;

    // default duration if not set.
    duration = duration != null ? duration : 60;

    // default winner if not set. I think this is how you could do a private auction.
    winner = winner != null ? winner : '0x0000000000000000000000000000000000000000';

    const result = await this.heroAuctionContract
      .connect(signer)
      .createAuction(tokenId, startingPrice, endingPrice, duration, winner);

    await result.wait();

    // todo: let's get something better to log.
    console.log(`created auction`);
  }

  async getCurrentPrice(tokenId: BigNumber): Promise<BigNumber> {
    const result = await this.heroAuctionContract.getCurrentPrice(tokenId);

    return result;
  }

  async getUserAuctions(address: string): Promise<BigNumber[]> {
    const result = await this.heroAuctionContract.getUserAuctions(address);

    return result;
  }

  onAuctionCreated(
    callback: (
      auctionId: BigNumber,
      owner: string,
      tokenId: BigNumber,
      startingPrice: BigNumber,
      endingPrice: BigNumber,
      duration: number,
      winner: string
    ) => void
  ): void {
    const filterQuestStarted = this.heroAuctionContract.filters.AuctionCreated(null);

    this.heroAuctionContract.on(
      filterQuestStarted,
      async (auctionId, owner, heroId, startingPrice, endingPrice, duration, winner) => {
        callback(auctionId, owner, heroId, startingPrice, endingPrice, duration, winner);
      }
    );
  }
}
