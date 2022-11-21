import { BigNumber, Contract, ContractReceipt, Signer } from 'ethers';
import { HeroStatGrowth } from './models/HeroStatGrowth.js';
import { HeroStatGrowthPicks } from './models/HeroStatGrowthPicks.js';
import { StatGrowth } from './models/StatGrowth.js';

export class MeditationCircle {
  constructor(private meditationCircleContract: Contract) {}

  async completeMeditation(signer: Signer, heroId: BigNumber) {
    console.log(`completing meditation for ${heroId}`);

    // submit the transaction
    const result = await this.meditationCircleContract.connect(signer).completeMeditation(heroId);

    // wait for the receipt
    const receipt = await result.wait();

    const meditationResult = this.parseCompleteMeditationReceipt(receipt);

    return meditationResult;
  }

  getBestGrowthStats(statGrowth: HeroStatGrowth): HeroStatGrowthPicks {
    const ignoredGrowthStats = ['hpSm', 'hpRg', 'hpLg', 'mpSm', 'mpRg', 'mpLg'];

    const statArray = Object.entries(statGrowth).filter((sa) => !ignoredGrowthStats.includes(sa[0]));

    const statArraySorted = statArray.sort((a, b) => b[1] - a[1]);

    return {
      primaryStatGrowth: StatGrowth[statArraySorted[0][0]],
      secondaryStatGrowth: StatGrowth[statArraySorted[1][0]],
      tertiaryStatGrowth: StatGrowth[statArraySorted[2][0]]
    };
  }

  parseCompleteMeditationReceipt(receipt: ContractReceipt) {
    receipt.logs.forEach((log) => {
      if (log.topics.indexOf(this.meditationCircleContract.interface.getEventTopic('LevelUp')) >= 0) {
        const event = this.meditationCircleContract.interface.parseLog(log);

        console.log('LevelUp Event', event.args.hero.stats, event.args.oldHero.stats);
      } else if (log.topics.indexOf(this.meditationCircleContract.interface.getEventTopic('StatUp')) >= 0) {
        const event = this.meditationCircleContract.interface.parseLog(log);

        console.log(`StatUp Event stat: ${event.args.stat}, increase: ${event.args.increase}`);
      }
    });
  }

  /**
   *
   * @param signer the wallet that you want to use to sign transaction
   * @param heroId the heroId that you are leveling
   * @param primaryStat primary stat to level
   * @param secondaryStat secondary stat to level
   * @param tertiaryStat third stat to level
   * @param attunementCrystal the contract address to the crystal that you want to use.
   */
  async startMeditation(
    signer: Signer,
    heroId: BigNumber,
    primaryStat: number,
    secondaryStat: number,
    tertiaryStat: number,
    attunementCrystal: string
  ) {
    console.log(
      `primaryStat: ${primaryStat}, secondaryStat: ${secondaryStat}, tertiaryStat: ${tertiaryStat}, attunementCrystal: ${attunementCrystal}`
    );

    // submit transaction
    const result = await this.meditationCircleContract
      .connect(signer)
      .startMeditation(heroId, primaryStat, secondaryStat, tertiaryStat, attunementCrystal);

    console.log(`submitted start meditation waiting for receipt`);

    // wait for receipt
    await result.wait();
  }
}
