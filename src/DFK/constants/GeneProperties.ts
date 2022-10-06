/**
 * @fileoverview In game choices to decode stat and visual genes.
 */

export class GeneProperties {
  static geneRank = {
    0: 'Basic1',
    1: 'Basic2',
    2: 'Basic3',
    3: 'Basic4',
    4: 'Basic5',
    5: 'Basic6',
    6: 'Basic7',
    7: 'Basic8',
    8: 'Basic9',
    9: 'Basic10',
    10: 'Basic11',
    11: 'Basic12',
    16: 'Advanced1',
    17: 'Advanced2',
    18: 'Advanced3',
    19: 'Advanced4',
    20: 'Advanced5',
    21: 'Advanced6',
    22: 'Advanced7',
    23: 'Advanced8',
    24: 'Elite1',
    25: 'Elite2',
    26: 'Elite3',
    27: 'Elite4',
    28: 'Transcendent1',
    29: 'Transcendent2'
  };

  static numberValues = {
    // // 0: 0,
    // // 1: 1,
    // // 2: 2,
    // // 3: 3,
    // // 4: 4,
    // // 5: 5,
    // // 6: 6,
    // // 7: 7,
    // // 16: 16,
    // // 17: 17,
    // // 18: 18,
    // // 19: 19,
    // // 24: 24,
    // // 25: 25,
    // // 28: 28,
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 11,
    12: 12,
    13: 13,
    14: 14,
    15: 15,
    16: 16,
    17: 17,
    18: 18,
    19: 19,
    20: 20,
    21: 21,
    22: 22,
    23: 23,
    24: 24,
    25: 25,
    26: 26,
    27: 27,
    28: 28,
    29: 29,
    30: 30,
    31: 31
  };

  // Attacks mapping is also used for visual and stat unknowns
  static attacks = this.geneRank;

  static appendageColor = {
    0: 'c5bfa7',
    1: 'a88b47',
    2: '58381e',
    3: '566f7d',
    4: '2a386d',
    5: '3f2e40',
    6: '830e18',
    7: '6f3a3c',
    8: 'cddef0',
    9: 'df7126',
    16: '6b173c',
    17: 'a0304d',
    18: '78547c',
    19: '352a51',
    20: '147256',
    24: 'c29d35',
    25: '211f1f',
    28: 'd7d7d7'
  };

  static backAppendageColor = this.appendageColor;

  static background = {
    0: 'desert',
    2: 'forest',
    4: 'plains',
    6: 'island',
    8: 'swamp',
    10: 'mountains',
    12: 'city',
    14: 'arctic'
  };

  static heroClass = {
    0: 'warrior',
    1: 'knight',
    2: 'thief',
    3: 'archer',
    4: 'priest',
    5: 'wizard',
    6: 'monk',
    7: 'pirate',
    8: 'berserker',
    9: 'seer',
    16: 'paladin',
    17: 'darkKnight',
    18: 'summoner',
    19: 'ninja',
    20: 'shapeshifter',
    24: 'dragoon',
    25: 'sage',
    28: 'dreadKnight'
  };

  static eyeColor = {
    0: '203997',
    2: '896693',
    4: 'bb3f55',
    6: '0d7634',
    8: '8d7136',
    10: '613d8a',
    12: '2494a2',
    14: 'a41e12'
  };

  static gender = { 1: 'male', 3: 'female' };

  static hairColor = {
    0: 'ab9159',
    1: 'af3853',
    2: '578761',
    3: '068483',
    4: '48321e',
    5: '66489e',
    6: 'ca93a7',
    7: '62a7e6',
    8: 'c34b1e',
    9: '326988',
    16: 'd7bc65',
    17: '9b68ab',
    18: '8d6b3a',
    19: '566377',
    20: '275435',
    24: '880016',
    25: '353132',
    28: '8f9bb3'
  };

  static skinColor = {
    0: 'c58135',
    2: 'f1ca9e',
    4: '985e1c',
    6: '57340c',
    8: 'e6a861',
    10: '7b4a11',
    12: 'e5ac91',
    14: 'aa5c38'
  };

  static backAppendage = this.numberValues;

  static hairStyle = this.numberValues;

  static headAppendage = this.numberValues;

  static subClass = this.heroClass;

  static traits = this.numberValues; // larger

  static profession = {
    0: 'mining',
    2: 'gardening',
    4: 'fishing',
    6: 'foraging'
  };

  static active1 = this.attacks;
  static active2 = this.attacks;

  static passive1 = this.attacks;
  static passive2 = this.attacks;

  static statBoost1 = {
    0: 'STR',
    2: 'AGI',
    4: 'INT',
    6: 'WIS',
    8: 'LCK',
    10: 'VIT',
    12: 'END',
    14: 'DEX'
  };
  static statBoost2 = this.statBoost1;
  static element = {
    0: 'fire',
    2: 'water',
    4: 'earth',
    6: 'wind',
    8: 'lightning',
    10: 'ice',
    12: 'light',
    14: 'dark'
  };
  static visualUnknown1 = this.numberValues;
  static visualUnknown2 = this.numberValues;

  static statsUnknown1 = this.numberValues;
  static statsUnknown2 = this.numberValues;
}
