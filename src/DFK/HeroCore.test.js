/* eslint-env node, jest */
import { BigNumber } from 'ethers';
import { HeroCore } from './HeroCore';

const contract = {};
const heroCore = new HeroCore({}, contract);

function getBasicHero() {
  return {
    info: {
      // blue gives +3 bonus
      // green gives +1 bonus
      // This gives green: agility, blue endurance (this is from hero 222122)
      statGenes: BigNumber.from('336706359480578615858112233749934675308832955261814047671642006997115136')
    },
    professions: {
      fishing: 0,
      foraging: 0,
      gardening: 0,
      mining: 0
    },
    state: {
      staminaFullAt: 0
    },
    stats: {
      agility: 0,
      dexterity: 0,
      endurance: 0,
      intelligence: 0,
      luck: 0,
      strength: 0,
      vitality: 0,
      wisdom: 0
    }
  };
}

describe('getHero', () => {
  beforeEach(() => {
    contract.getHero = async () => getBasicHero();
  });

  test('bestTrainingStat returns stat with highest value', async () => {
    const hero = getBasicHero();
    hero.stats.wisdom = 4;
    contract.getHero = async () => hero;

    const actualHero = await heroCore.getHero(1);
    expect(actualHero.bestTrainingStat).toBe('wisdom');
  });

  test('bestTrainingStat uses blue stat boost (StatBoost2)', async () => {
    const hero = getBasicHero();
    hero.stats.intelligence = 5;
    hero.stats.endurance = 3; // blue buff should put endurance up to 6
    contract.getHero = async () => hero;

    const actualHero = await heroCore.getHero(2);
    expect(actualHero.bestTrainingStat).toBe('endurance');
  });

  test('bestTrainingStat uses green stat boost (StatBoost1)', async () => {
    const hero = getBasicHero();
    hero.stats.strength = 5;
    hero.stats.agility = 4; // green buff should put agility up to 5.
    contract.getHero = async () => hero;

    const actualHero = await heroCore.getHero(3);
    expect(actualHero.bestTrainingStat).toBe('agility');
  });

  test('bestTrainingStatValue returns stat with highest value', async () => {
    const hero = getBasicHero();
    hero.stats.wisdom = 4;
    contract.getHero = async () => hero;

    const actualHero = await heroCore.getHero(1);

    expect(actualHero.bestTrainingStatValue).toBe(hero.stats.wisdom);
  });

  test('bestTrainingStatValue uses blue stat boost (StatBoost2)', async () => {
    const hero = getBasicHero();
    hero.stats.intelligence = 5;
    hero.stats.endurance = 3; // blue buff should put endurance up to 6
    contract.getHero = async () => hero;

    const actualHero = await heroCore.getHero(2);

    expect(actualHero.bestTrainingStatValue).toBe(6);
  });

  test('bestTrainingStatValue uses green stat boost (StatBoost1)', async () => {
    const hero = getBasicHero();
    hero.stats.strength = 5;
    hero.stats.agility = 4; // green buff should put agility up to 5.
    contract.getHero = async () => hero;

    const actualHero = await heroCore.getHero(3);

    expect(actualHero.bestTrainingStatValue).toBe(5);
  });
});
