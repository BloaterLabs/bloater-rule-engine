import { ContractAddresses } from '../models/Addresses/ContractAddresses.js';
import { Addresses, Item, QuestAddresses } from '../models/index.js';

export class KlayAddresses implements Addresses {
  contractAddresses: ContractAddresses = {
    eternalStory: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
    heroAuction: '0x7F2B66DB2D02f642a9eb8d13Bc998d441DDe17A8',
    heroCore: '0x268CC8248FFB72Cd5F3e73A9a20Fa2FF40EfbA61',
    itemGoldTraderV2: '',
    meditationCircle: '0xdbEE8C336B06f2d30a6d2bB3817a3Ae0E34f4900',
    questCoreV1: '',
    questCoreV2: '0x8dc58d6327E1f65b18B82EDFb01A361f3AAEf624',
    uniswapV2Factory: '',
    uniswapV2Router: ''
  };

  none = '0x0000000000000000000000000000000000000000';

  questAddresses: QuestAddresses = {
    none: '0x0000000000000000000000000000000000000000',
    fishing: '0x0E7a8b035eF2FA0183a2680458818256424Bd60B',
    foraging: '0x54DaD24dDc2cC6E7616438816DE0EeFCad79B625',
    gardeningBtcUsdc: '',
    gardeningCrystalAvax: '',
    gardeningCrystalBtc: '0x05305c97e9A2FDC0F5Ea23824c1348DEeD9Aff04',
    gardeningCrystalEth: '0xb911F5D6F9129365d1a415DD3CBa17F0240CFA70',
    gardeningCrystalJewel: '0x3837612f3A14C92Da8E0186AB398A753fe169dc1',
    gardeningCrystalKlay: '',
    gardeningCrystalUsdc: '',
    gardeningEthUsdc: '',
    gardeningJewelAvax: '0xDAd93871e42a11aD577E4DCa02c7C426800A47D5',
    gardeningJewelBtc: '0x85106b1aF8B0337CB39a9aacDa87849B882a3170',
    gardeningJewelEth: '0x7038F49cAA6e2f26677D237A2A40EC6354bA1eA5',
    gardeningJewelKlay: '0x3198f51A1c8cFC5f1FeaD58feaa19E6dFc8e9737',
    gardeningJewelUsdc: '0x0831f733870e847263907F32B3367De2f47CeAf0',
    gardeningJewelXJewel: '',
    miningGold: '0x46F036B26870188aD69877621815238D2b81bef1',
    miningLocked: '0x20B274262FA6da57B5Ff90498EC373c0266eF901',
    wishingWell: '',
    strength: '0xF2143c7c8Dfca976415bDf7d37dfa63aed8Ef741',
    agility: '0x378052bbc8D2E1819194802b8A990E7Ae43655bA',
    intelligence: '0xe606f6548Ae34DA9065B4fee88990F239b445403',
    wisdom: '0x80F93836811a9A7721A21D7d8751aFd6A8fC9308',
    luck: '0x5C01d797d0Cc3D79c01ef98f7ffAe25E4dCEB400',
    dexterity: '0x8F3acf63fd09ceCD1F387B7bC45bc245f43D4B5e',
    vitality: '0x89a60d8B332ce2Dd3bE8b170c6391F98a03a665F',
    endurance: '0x058282847F1C8E893edcdfea5df6eb203ECA7832'
  };
  tokenAddresses: Item[] = [
    {
      address: '0xB3F5867E277798b50ba7A71C0b24FDcA03045eDF',
      symbol: 'JADE',
      color: 'yellow',
      contract: 'erc20',
      decimals: 18,
      name: 'Jade',
      vendorValue: 0
    },
    {
      address: '0x30C103f8f5A3A732DFe2dCE1Cc9446f545527b43',
      symbol: 'JEWEL',
      color: 'yellow',
      decimals: 18,
      name: 'Jewel',
      vendorValue: 0
    },
    {
      address: '0xaA8548665bCC12C202d5d0C700093123F2463EA6',
      symbol: 'sJEWEL',
      color: 'yellow',
      contract: 'erc20',
      name: 'sJewel',
      vendorValue: 0,
      decimals: 18
    },
    // {
    //   address: '',
    //   symbol: 'XJEWEL',
    //   contract: 'erc20',
    //   name: 'xJEWEL',
    //   vendorValue: 0,
    //   decimals: 18
    // },
    {
      address: '0xe7a1B580942148451E47b92e95aEB8d31B0acA37',
      symbol: 'DFKGOLD',
      color: 'grey',
      contract: 'erc20',
      name: 'DFK Gold',
      vendorValue: 0,
      decimals: 3
    },
    {
      address: '0x8Be0cbA3c8c8F392408364ef21dfCF714A918234',
      symbol: 'DFKTEARS',
      contract: 'erc20',
      name: "Gaia's Tears",
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0x75E8D8676d774C9429FbB148b30E304b5542aC3d',
      symbol: 'DFKAMBRTFY',
      contract: 'erc20',
      name: 'Ambertaffy',
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0xE408814828f2b51649473c1a05B861495516B920',
      symbol: 'DFKMILKWEED',
      contract: 'erc20',
      name: 'Milkweed',
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0xEDFBe9EEf42FfAf8909EC9Ce0d79850BA0C232FE',
      symbol: 'DFKDRKWD',
      contract: 'erc20',
      name: 'Darkweed',
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0xeaF833A0Ae97897f6F69a728C9c17916296cecCA',
      symbol: 'DFKGLDVN',
      contract: 'erc20',
      name: 'Goldvein',
      vendorValue: 100,
      decimals: 0
    },
    {
      address: '0x08D93Db24B783F8eBb68D7604bF358F5027330A6',
      symbol: 'DFKSPIDRFRT',
      contract: 'erc20',
      decimals: 0,
      name: 'SpiderFruit',
      vendorValue: 0
    },
    {
      address: '0x4cD7025BD6e1b77105b90928362e6715101d0b5a',
      symbol: 'DFKRGWD',
      contract: 'erc20',
      decimals: 0,
      name: 'Ragweed',
      vendorValue: 2.5
    },
    {
      address: '0xadbF23Fe3B47857614940dF31B28179685aE9B0c',
      symbol: 'DFKRDLF',
      contract: 'erc20',
      decimals: 0,
      name: 'Redleaf',
      vendorValue: 0
    },
    {
      address: '0xf2D479DaEdE7F9e270a90615F8b1C52F3C487bC7',
      symbol: 'DFKRCKRT',
      contract: 'erc20',
      decimals: 0,
      name: 'Rockroot',
      vendorValue: 0
    },
    {
      address: '0xDbd4fA2D2C62C6c60957a126970e412Ed6AC1bD6',
      symbol: 'DFKBLUESTEM',
      contract: 'erc20',
      decimals: 0,
      name: 'Blue Stem',
      vendorValue: 0
    },
    {
      address: '0xCd2192521BD8e33559b0CA24f3260fE6A26C28e4',
      symbol: 'DFKSWFTHSL',
      contract: 'erc20',
      decimals: 0,
      name: 'Swift-Thistle',
      vendorValue: 0
    },
    {
      address: '0xD69542aBE74413242e387Efb9e55BE6A4863ca10',
      symbol: 'DFKFROSTDRM',
      contract: 'erc20',
      decimals: 0,
      name: 'Frost Drum',
      vendorValue: 2.5
    },
    {
      address: '0xFceFA4Abcb18a7053393526f75Ad33fac5F25dc9',
      symbol: 'DFKKNAPROOT',
      contract: 'erc20',
      decimals: 0,
      name: 'Knaproot',
      vendorValue: 15
    },
    {
      address: '0xCe370D379f0CCf746B3426E3BD3923f3aDF0DC1a',
      symbol: 'DFKSHAGCAP',
      contract: 'erc20',
      decimals: 0,
      name: 'Shaggy Caps',
      vendorValue: 100
    },
    {
      address: '0x874FC0015ece1d77ba3D5668F16c46ba72913239',
      symbol: 'DFKSKNSHADE',
      contract: 'erc20',
      decimals: 0,
      name: 'Skunk Shade',
      vendorValue: 0
    },
    {
      address: '0x72F860bF73ffa3FC42B97BbcF43Ae80280CFcdc3',
      symbol: 'DFKBLOATER',
      contract: 'erc20',
      decimals: 0,
      name: 'Bloater',
      vendorValue: 2.5
    },
    {
      address: '0xBcdD90034eB73e7Aec2598ea9082d381a285f63b',
      symbol: 'DFKIRONSCALE',
      contract: 'erc20',
      decimals: 0,
      name: 'Ironscale',
      vendorValue: 0
    },
    {
      address: '0x80A42Dc2909C0873294c5E359e8DF49cf21c74E4',
      symbol: 'DFKLANTERNEYE',
      contract: 'erc20',
      decimals: 0,
      name: 'Lanterneye',
      vendorValue: 0
    },
    {
      address: '0x8D2bC53106063A37bb3DDFCa8CfC1D262a9BDCeB',
      symbol: 'DFKREDGILL',
      contract: 'erc20',
      decimals: 0,
      name: 'Redgill',
      vendorValue: 15
    },
    {
      address: '0xc6030Afa09EDec1fd8e63a1dE10fC00E0146DaF3',
      symbol: 'DFKSAILFISH',
      contract: 'erc20',
      decimals: 0,
      name: 'Sailfish',
      vendorValue: 0
    },
    {
      address: '0xa61Bac689AD6867a605633520D70C49e1dCce853',
      symbol: 'DFKSHIMMERSKIN',
      contract: 'erc20',
      decimals: 0,
      name: 'Shimmerskin',
      vendorValue: 0
    },
    {
      address: '0x7E121418cC5080C96d967cf6A033B0E541935097',
      symbol: 'DFKSILVERFIN',
      contract: 'erc20',
      decimals: 0,
      name: 'Silverfin',
      vendorValue: 100
    },
    {
      address: '0x18cB286EeCE992f79f601E49acde1D1F5dE32a30',
      symbol: 'DFKFBLOATER',
      contract: 'erc20',
      decimals: 0,
      name: 'Frost Bloater',
      vendorValue: 2.5
    },
    {
      address: '0x48d9fC80A47cee2d52DE950898Bc6aBF54223F81',
      symbol: 'DFKSPCKLTL',
      contract: 'erc20',
      decimals: 0,
      name: 'Speckle Tail',
      vendorValue: 15
    },
    {
      address: '0xB4A516bf36e44c0CE9E3E6769D3BA87341Cd9959',
      symbol: 'DFKKINGPNCR',
      contract: 'erc20',
      decimals: 0,
      name: 'King Pincer',
      vendorValue: 100
    },
    {
      address: '0x7E1298EBF3a8B259561df6E797Ff8561756E50EA',
      symbol: 'DFKTHREEL',
      contract: 'erc20',
      decimals: 0,
      name: 'Three Eyed Eel',
      vendorValue: 0
    },
    {
      address: '0x907a98319AEB249e387246637149f4B2e7D21dB7',
      symbol: 'DFKSHVAS',
      contract: 'erc20',
      decimals: 0,
      name: 'Shvas Rune',
      vendorValue: 0
    },
    {
      address: '0xd0223143057Eb44065e789b202E03A5869a6006C',
      symbol: 'DFKMOKSHA',
      contract: 'erc20',
      decimals: 0,
      name: 'Moksha Rune',
      vendorValue: 0
    },
    {
      address: '0x29ADd7D022c591D56eb4aFd262075dA900C67ab1',
      symbol: 'DFKBLUEEGG',
      color: 'blue',
      contract: 'erc20',
      decimals: 0,
      name: 'Blue Pet Egg',
      vendorValue: 0
    },
    {
      address: '0xb1Ec534fBBfEBd4563A4B0055E744286CE490f26',
      symbol: 'DFKGREENEGG',
      color: 'green',
      contract: 'erc20',
      decimals: 0,
      name: 'Green Pet Egg',
      vendorValue: 0
    },
    {
      address: '0xfd29ebdE0dd1331C19BBF54518df94b442ACb38C',
      symbol: 'DFKGREGG',
      color: 'grey',
      contract: 'erc20',
      decimals: 0,
      name: 'Grey Pet Egg',
      vendorValue: 0
    },
    {
      address: '0x0A73aF98781bad9BCb80A71241F129EA877eF1b7',
      symbol: 'DFKYELOWEGG',
      color: 'yellow',
      contract: 'erc20',
      decimals: 0,
      name: 'Yellow Pet Egg',
      vendorValue: 0
    },
    {
      address: '0xc9731BE04F217543E3010cCbf903E858EFde840f',
      symbol: 'DFKGOLDEGG',
      color: 'yellowBright',
      contract: 'erc20',
      decimals: 0,
      name: 'Golden Egg',
      vendorValue: 0
    },
    {
      address: '0x4546DBaAb48Bf1BF2ad7B56d04952d946Ab6e2a7',
      symbol: 'DFKSTMNPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Stamina Vial',
      vendorValue: 0
    },
    {
      address: '0xcb7aA7cA9357DAF9F2b78D262A4f89cDfE5abC70',
      symbol: 'DFKSWFTPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Swiftness Potion',
      vendorValue: 0
    },
    {
      address: '0xa27C1429a676db902B9f0360686eDbB57d0A7B01',
      symbol: 'DFKHLTHPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Health Vial',
      vendorValue: 0
    },
    {
      address: '0xf710244462431b9962706B46826AFB3B38376c7b',
      symbol: 'DFKFHLTHPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Full Health Potion',
      vendorValue: 0
    },
    {
      address: '0xE34a733fA92B41A1CA4241da9D2d5834Cc8D1011',
      symbol: 'DFKANTPSN',
      contract: 'erc20',
      decimals: 0,
      name: 'Anti-poison Potion',
      vendorValue: 0
    },
    {
      address: '0xf757a7F4ffF29e7F7b4aCCe6Ffb04E59e91EFDA8',
      symbol: 'DFKTFNSPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Toughness Potion',
      vendorValue: 0
    },
    {
      address: '0x8639d64A2088500EC4f20fB5C41A995fE4f1d85a',
      symbol: 'DFKMNPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Mana Vial',
      vendorValue: 0
    },
    {
      address: '0x108D31E23bC6540878E6532F3376b3EC982e1C58',
      symbol: 'DFKFMNPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Full Mana Potion',
      vendorValue: 0
    },
    {
      address: '0x9c8A0C6a7ad8Be153773070D434CDbeA5176D2ff',
      symbol: 'DFKMGCRSPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Magic Resistance Potion',
      vendorValue: 0
    },
    {
      address: '0x5FB537aF1d929af7BDD7935C289158c940782ed6',
      symbol: 'DFKANTBLND',
      contract: 'erc20',
      decimals: 0,
      name: 'Anti-blinding Potion',
      vendorValue: 0
    },
    {
      address: '0x537E800b8fD22Dc76A438Af8b9923986A5487853',
      symbol: 'DFKLCHSCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Chaos Crystal',
      vendorValue: 0
    },
    {
      address: '0xC3B36a02f360c3d18042bF3533be602cb775007A',
      symbol: 'DFKLFINCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Finesse Crystal',
      vendorValue: 0
    },
    {
      address: '0x1E672a8385b39E13267efA2Fb39f574a2a23AE9F',
      symbol: 'DFKLFRTICR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Fortitude Crystal',
      vendorValue: 0
    },
    {
      address: '0x8baD15B5C531d119b328d0F716a6B9D90CeDa88A',
      symbol: 'DFKLFRTUCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Fortune Crystal',
      vendorValue: 0
    },
    {
      address: '0x5f967E325E91977B42D2591Fc2f57da75Ee4490B',
      symbol: 'DFKLINSCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Insight Crystal',
      vendorValue: 0
    },
    {
      address: '0x80Ab38fc9fA0a484b98d5600147e7C695627747D',
      symbol: 'DFKLMGHTCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Might Crystal',
      vendorValue: 0
    },
    {
      address: '0x32Cbbfd741EB7634818aa2e3E8502367cB6602BE',
      symbol: 'DFKLSWFTCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Swiftness Crystal',
      vendorValue: 0
    },
    {
      address: '0x6C7AF7483b050a00b5fbC4241eD06944c5f0bD77',
      symbol: 'DFKLVGRCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Vigor Crystal',
      vendorValue: 0
    },
    {
      address: '0xf15035b5eD13Feb18f63D829ABc1c3139041e7C2',
      symbol: 'DFKLWITCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Wit Crystal',
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 1',
      uri: 0,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 2',
      uri: 1,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 3',
      uri: 2,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 4',
      uri: 3,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 5',
      uri: 4,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 6',
      uri: 5,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 7',
      uri: 6,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 8',
      uri: 7,
      vendorValue: 0
    },
    {
      address: '0x26bdcB310313eFf8D580e43762e2020B23f3e728',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 9',
      uri: 8,
      vendorValue: 0
    }
  ];
}
