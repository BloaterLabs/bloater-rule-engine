import { HeroStats } from './HeroStats';
import { HeroStatus } from './HeroStatus';
import { Profession } from './Profession';
import { Professions } from './Professions';
import { Stats } from './Stats';

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

  currentStamina: number;

  id: number;

  maxStamina: number;

  name: string;

  profession: typeof Profession;

  professions: Professions;

  quest: string;

  questAddress: string;

  staminaFullAt: Date;

  statBoost1: typeof Stats;

  statBoost2: typeof Stats;

  stats: HeroStats;

  // todo: I think we're doing two different statuses here compared to what is on the original object.
  status: HeroStatus;
}
