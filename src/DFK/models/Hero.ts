import { HeroClass, HeroStats, HeroStatGrowth, HeroStatus, Profession, Professions, Rarity, Stats } from './index.js';

export interface Hero {
  /**
   * Your heroes best stat for use in training. This takes into account the stat boosts you have as well.
   */
  bestTrainingStat: string;

  /**
   * The highest stat value you have related to training quests. This is useful if you only want to send heroes that
   * have a stat above a certain amount on a training quest.
   */
  bestTrainingStatValue: number;

  class: typeof HeroClass;

  currentStamina: number;

  generation: number;

  id: number;

  level: number;

  maxSummons: number;

  name: string;

  primaryStatGrowth: HeroStatGrowth;

  profession: typeof Profession;

  professions: Professions;

  quest: string;

  questAddress: string;

  rarity: typeof Rarity;

  remainingSummons: number;

  secondaryStatGrowth: HeroStatGrowth;

  staminaFullAt: Date;

  statBoost1: typeof Stats;

  statBoost2: typeof Stats;

  stats: HeroStats;

  // todo: I think we're doing two different statuses here compared to what is on the original object.
  status: HeroStatus;

  subClass: typeof HeroClass;

  summons: number;

  xp: number;

  xpToLevel: number;
}
