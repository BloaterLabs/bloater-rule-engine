import { Contract } from 'ethers';

import { GeneProperties } from './constants/GeneProperties';
import { Hero, HeroStats, Professions, QuestAddresses } from './models';
import { Stats } from './models/Stats';
import { QuestHelper } from './QuestHelper';

export class HeroCore {
  private statGeneMap = {
    0: 'class',
    1: 'subClass',
    2: 'profession',
    3: 'passive1',
    4: 'passive2',
    5: 'active1',
    6: 'active2',
    7: 'statBoost1',
    8: 'statBoost2',
    9: 'statsUnknown1',
    10: 'element',
    11: 'statsUnknown2'
  };

  constructor(private questAddresses: QuestAddresses, private heroesContract: Contract) {}

  /**
   * Returns the requested hero for the passed in heroId.
   *
   * @param heroId The heroId you want to get details for
   * @returns The requested hero with all of its details.
   */
  async getHero(heroId: number): Promise<Hero> {
    const heroOriginal = await this.heroesContract.getHero(heroId);

    const heroStats: HeroStats = {
      agility: heroOriginal.stats.agility,
      dexterity: heroOriginal.stats.dexterity,
      endurance: heroOriginal.stats.endurance,
      hp: heroOriginal.stats.hp,
      intelligence: heroOriginal.stats.intelligence,
      luck: heroOriginal.stats.luck,
      mp: heroOriginal.stats.mp,
      stamina: heroOriginal.stats.stamina,
      strength: heroOriginal.stats.strength,
      vitality: heroOriginal.stats.vitality,
      wisdom: heroOriginal.stats.wisdom
    };

    const professions: Professions = {
      fishing: heroOriginal.professions.fishing,
      foraging: heroOriginal.professions.foraging,
      gardening: heroOriginal.professions.gardening,
      mining: heroOriginal.professions.mining
    };

    const staminaFullAt = new Date(heroOriginal.state.staminaFullAt * 1000);

    // todo: make a model for this.
    const statGenes = this.mapToGenes(BigInt(heroOriginal.info.statGenes), this.statGeneMap);
    // Get the best training quest and stat
    const bestTraining = this.getBestTraining(heroStats, statGenes['statBoost1'], statGenes['statBoost2']);

    const hero: Hero = {
      bestTrainingStat: bestTraining.stat,
      bestTrainingStatValue: bestTraining.value,
      currentStamina: this.getCurrentStamina(staminaFullAt, heroStats.stamina),
      id: heroId,
      maxStamina: heroOriginal.info.stamina,
      name: `${heroOriginal.info.firstName} ${heroOriginal.info.lastName}`,
      profession: statGenes['profession'],
      professions: professions,
      quest: QuestHelper.getQuestName(this.questAddresses, heroOriginal.state.currentQuest),
      questAddress: heroOriginal.state.currentQuest,
      statBoost1: statGenes['statBoost1'],
      statBoost2: statGenes['statBoost2'],
      stats: heroStats,
      status: heroOriginal.state.status,
      staminaFullAt: staminaFullAt
    };

    return hero;
  }

  /** Gets all heroes for address with details. This will make a RPC call for
   * every hero that this address owns.
   */
  async getHeroes(address: string): Promise<Hero[]> {
    const heroes: Hero[] = [];

    const heroIds = await this.getHeroIds(address);

    await Promise.all(
      heroIds.map(async (heroId: number) => {
        const hero = await this.getHero(heroId);

        heroes.push(hero);
      })
    );

    return heroes;
  }

  /**
   * Get HeroIds owned by the passed in address.
   *
   * @param address The address that you want to return heroIds from
   * @returns The HeroIds associated to this wallet address.
   */
  async getHeroIds(address: string): Promise<number[]> {
    const heroIds = await this.heroesContract.getUserHeroes(address);

    return heroIds;
  }

  private getBestTraining(heroStats: HeroStats, statBoost1: typeof Stats, statBoost2: typeof Stats) {
    const ignoredStat = ['hp', 'mp', 'stamina'];
    let bestStat = 'vitality';
    let bestStatValue = 0;

    for (const stat in heroStats) {
      // skip the ones we want to ignore
      if (ignoredStat.indexOf(stat) >= 0) {
        continue;
      }

      let statValue = heroStats[stat];

      // check for boosts
      if (statBoost1 === Stats[stat]) {
        statValue += 1;
      }
      if (statBoost2 === Stats[stat]) {
        statValue += 3;
      }

      if (statValue > bestStatValue) {
        bestStatValue = statValue;
        bestStat = stat;
      }
    }

    return {
      stat: bestStat,
      value: bestStatValue
    };
  }

  /**
   * Calculate the current stamina for hero.
   */
  private getCurrentStamina(staminaFullAt: Date, maxStamina: number): number {
    // 20 minutes per stamina * 60000 to convert to ms
    const millisecondsPerStamina = 20 * 60000;

    if (staminaFullAt.valueOf() <= Date.now()) {
      return maxStamina;
    }

    const millisecondsToFull = staminaFullAt.valueOf() - Date.now();

    const staminaLeft = maxStamina - Math.ceil(millisecondsToFull / millisecondsPerStamina);

    return staminaLeft;
  }

  private mapToGenes(genesStr: bigint, genesMap) {
    //console.log(genesStr);
    const rawKai = this.genesToKai(genesStr).split(' ').join('');

    const genes = { recessives: {} };

    let count = 0;

    for (const k in rawKai.split('')) {
      if (Object.prototype.hasOwnProperty.call(rawKai, k)) {
        const trait = genesMap[Math.floor(Number(k) / 4)];
        const kai = rawKai[k];
        const valueNum = this.kai2dec(kai);

        // Create base genes
        genes[trait] = GeneProperties.traits[valueNum];

        // Create recessives
        if (!genes.recessives[trait]) {
          genes.recessives[trait] = {};
        }

        if (Object.keys(genes.recessives[trait]).length < 3) {
          count += 1;
          const position = 4 - count;
          genes.recessives[trait] = {
            ...genes.recessives[trait],
            [`r${position}`]: GeneProperties.traits[valueNum]
          };
        } else {
          genes.recessives[trait] = {
            ...genes.recessives[trait],
            d: GeneProperties.traits[valueNum]
          };
          count = 0;
        }
      }
    }

    return genes;
  }

  private genesToKai(genes: bigint) {
    //genes = BigInt(genes);
    const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
    const BASE = BigInt(ALPHABET.length);

    let buf = '';
    while (genes >= BASE) {
      const mod = genes % BASE;
      buf = ALPHABET[Number(mod)] + buf;
      genes = (genes - mod) / BASE;
    }

    // Add the last 4 (finally).
    buf = ALPHABET[Number(genes)] + buf;

    // Pad with leading 0s.
    buf = buf.padStart(48, '1');

    const out = buf.replace(/(.{4})/g, '$1 ');
    return out;
  }

  private kai2dec = (kai) => {
    const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
    return ALPHABET.indexOf(kai);
  };
}
