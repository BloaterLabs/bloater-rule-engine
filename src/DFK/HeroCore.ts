import { Contract } from 'ethers';

import { GeneProperties } from './constants/GeneProperties.js';
import { Hero, HeroStatGrowth, HeroStatGrowthPicks, HeroStats, Professions, QuestAddresses } from './models/index.js';
import { StatGrowth } from './models/StatGrowth.js';
import { Stats } from './models/Stats.js';
import { QuestHelper } from './QuestHelper.js';

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

    const primaryStatGrowth: HeroStatGrowth = this.getHeroStatGrowth(heroOriginal.primaryStatGrowth);
    const secondaryStatGrowth: HeroStatGrowth = this.getHeroStatGrowth(heroOriginal.secondaryStatGrowth);

    const hero: Hero = {
      bestTrainingStat: bestTraining.stat,
      bestTrainingStatValue: bestTraining.value,
      class: heroOriginal.info.class,
      currentStamina: this.getCurrentStamina(staminaFullAt, heroStats.stamina),
      id: heroId,
      generation: heroOriginal.info.generation,
      level: heroOriginal.state.level,
      maxSummons: heroOriginal.summoningInfo.maxSummons,
      name: `${heroOriginal.info.firstName} ${heroOriginal.info.lastName}`,
      primaryStatGrowth: primaryStatGrowth,
      profession: statGenes['profession'],
      professions: professions,
      quest: QuestHelper.getQuestName(this.questAddresses, heroOriginal.state.currentQuest),
      questAddress: heroOriginal.state.currentQuest,
      rarity: heroOriginal.info.rarity,
      remainingSummons: heroOriginal.summoningInfo.maxSummons - heroOriginal.summoningInfo.summons,
      secondaryStatGrowth: secondaryStatGrowth,
      statBoost1: statGenes['statBoost1'],
      statBoost2: statGenes['statBoost2'],
      stats: heroStats,
      status: heroOriginal.state.status,
      staminaFullAt: staminaFullAt,
      subClass: heroOriginal.info.subClass,
      summons: heroOriginal.summoningInfo.summons,
      xp: heroOriginal.state.xp,
      xpToLevel: this.getXpToLevel(heroOriginal.state.level)
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

  private getHeroStatGrowth(originalStatGrowth): HeroStatGrowth {
    const statGrowth: HeroStatGrowth = {
      agility: originalStatGrowth.agility,
      dexterity: originalStatGrowth.dexterity,
      endurance: originalStatGrowth.endurance,
      hpLarge: originalStatGrowth.hpLg,
      hpRegular: originalStatGrowth.hpRg,
      hpSmall: originalStatGrowth.hpSm,
      intelligence: originalStatGrowth.intelligence,
      luck: originalStatGrowth.luck,
      mpLarge: originalStatGrowth.mpLg,
      mpRegular: originalStatGrowth.mpRg,
      mpSmall: originalStatGrowth.mpSm,
      strength: originalStatGrowth.strength,
      vitality: originalStatGrowth.vitality,
      wisdom: originalStatGrowth.wisdom
    };

    return statGrowth;
  }

  private getXpToLevel(currentLevel: number): number {
    const nextLevel = currentLevel + 1;

    switch (true) {
      case currentLevel < 6:
        return nextLevel * 1000;
      case currentLevel < 9:
        return 4000 + (nextLevel - 5) * 2000;
      case currentLevel < 16:
        return 12000 + (nextLevel - 9) * 4000;
      case currentLevel < 36:
        return 40000 + (nextLevel - 16) * 5000;
      case currentLevel < 56:
        return 140000 + (nextLevel - 36) * 7500;
      case currentLevel >= 56:
        return 290000 + (nextLevel - 56) * 10000;
      default:
        return 0;
    }
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

  private kai2dec(kai: string) {
    const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
    return ALPHABET.indexOf(kai);
  }
}
