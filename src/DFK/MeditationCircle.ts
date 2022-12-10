import { BigNumber, Contract, ContractReceipt, Signer } from 'ethers';
import { HeroStatGrowth } from './models/HeroStatGrowth.js';
import { HeroStatGrowthPicks } from './models/HeroStatGrowthPicks.js';
import { MeditationResult } from './models/index.js';
import { StatGrowth } from './models/StatGrowth.js';

export class MeditationCircle {
  constructor(private meditationCircleContract: Contract) {}

  async completeMeditation(signer: Signer, heroId: BigNumber) {
    // submit the transaction
    const result = await this.meditationCircleContract.connect(signer).completeMeditation(heroId);

    // wait for the receipt
    const receipt = await result.wait();

    const meditationResult = this.parseCompleteMeditationReceipt(receipt);

    return meditationResult;
  }

  async getActiveMeditations(address: string) {
    const results = await this.meditationCircleContract.getActiveMeditations(address);

    return results.map((r) => r.heroId);
  }

  getBestGrowthStats(statGrowth: HeroStatGrowth): HeroStatGrowthPicks {
    const ignoredGrowthStats = ['hpSm', 'hpRg', 'hpLg', 'mpSm', 'mpRg', 'mpLg'];

    const statArray = Object.entries(statGrowth).filter((sa) => !ignoredGrowthStats.includes(sa[0]));

    const statArraySorted = statArray.sort((a, b) => b[1] - a[1]);

    return {
      primary: StatGrowth[statArraySorted[0][0]],
      secondary: StatGrowth[statArraySorted[1][0]],
      tertiary: StatGrowth[statArraySorted[2][0]]
    };
  }

  parseCompleteMeditationReceipt(receipt: ContractReceipt): MeditationResult {
    const meditationResult: MeditationResult = {
      statsUp: {
        hp: 0,
        mp: 0,
        stamina: 0,
        agility: 0,
        dexterity: 0,
        endurance: 0,
        intelligence: 0,
        luck: 0,
        strength: 0,
        vitality: 0,
        wisdom: 0
      },
      statsOld: undefined,
      statsNew: undefined
    };

    receipt.logs.forEach((log) => {
      if (log.topics.indexOf(this.meditationCircleContract.interface.getEventTopic('LevelUp')) >= 0) {
        const event = this.meditationCircleContract.interface.parseLog(log);

        meditationResult.statsNew = event.args.hero.stats;
        meditationResult.statsOld = event.args.oldHero.stats;
      } else if (log.topics.indexOf(this.meditationCircleContract.interface.getEventTopic('StatUp')) >= 0) {
        const event = this.meditationCircleContract.interface.parseLog(log);

        const statUp = Object.entries(StatGrowth).find((sg) => sg[1] == event.args.stat);
        meditationResult.statsUp[statUp[0]] += event.args.increase;
      }
    });

    return meditationResult;
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
    // submit transaction
    const result = await this.meditationCircleContract
      .connect(signer)
      .startMeditation(heroId, primaryStat, secondaryStat, tertiaryStat, attunementCrystal);

    // wait for receipt
    await result.wait();
  }
}
