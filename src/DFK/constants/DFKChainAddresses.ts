import { Addresses } from '../models/Addresses/Addresses.js';
import { ContractAddresses } from '../models/Addresses/ContractAddresses.js';
import { QuestAddresses } from '../models/Addresses/QuestAddresses.js';
import { Item } from '../models/Item.js';

export class DFKChainAddresses implements Addresses {
  contractAddresses: ContractAddresses = {
    eternalStory: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
    heroAuction: '0xc390fAA4C7f66E4D62E59C231D5beD32Ff77BEf0',
    heroCore: '0xEb9B61B145D6489Be575D3603F4a704810e143dF',
    itemGoldTraderV2: '0x0f85fdf6c561C42d6b46d0E27ea6Aa9Bf9476B3f',
    questCoreV1: null,
    questCoreV2: '0xE9AbfBC143d7cef74b5b793ec5907fa62ca53154',
    uniswapV2Factory: '0x794C07912474351b3134E6D6B3B7b3b4A07cbAAa',
    uniswapV2Router: '0x3C351E1afdd1b1BC44e931E12D4E05D6125eaeCa'
  };

  questAddresses: QuestAddresses = {
    none: '0x0000000000000000000000000000000000000000',
    fishing: '0x407ab39B3675f29A719476af6eb3B9E5d93969E6',
    foraging: '0xAd51199B453075C73FA106aFcAAD59f705EF7872',
    gardeningBtcUsdc: '0x045838dBfb8026520E872c8298F4Ed542B81Eaca',
    gardeningCrystalAvax: '0x8eDA0ceA7a90E794B33708Cc0768727A1A612f3d',
    gardeningCrystalBtc: '0x706916dbC3b66d89632708CC193080ea05E0534A',
    gardeningCrystalEth: '0x810e1fF51fDd58c474c66A31013713D1A17BF458',
    gardeningCrystalJewel: '0xC4839Fb9A5466878168EaE3fD58c647B71475b61',
    gardeningCrystalKlay: '0x1fCc67a01525fd715A67bCcbF73665Fb3dBE76c7',
    gardeningCrystalUsdc: '0x6FEF23498877bC4c3940ebE121dd7D138BdA4e11',
    gardeningEthUsdc: '0xdeF7cBeE7d0B62037616ee26BCAc1C8364f53476',
    gardeningJewelAvax: '0xA0d17554F09047d65E0ae0e76CD8923A9525183c',
    gardeningJewelBtc: '0x3391B9384AC66C7Aa3BF4A75A4f441942B1dCf30',
    gardeningJewelEth: '0xbaEc39Dd81b964B57bc5fa5f5421Cd82185409E6',
    gardeningJewelKlay: '0x2A70aA48f9dBF859239ae5E7f98fe95aE27A6CD4',
    gardeningJewelUsdc: '0xaac3933Faa3B668304C9276d10CA88853463BD42',
    gardeningJewelXJewel: '0xd3d8ff8e42C2eD51FabE4BA34080C6ac79395f24',
    miningGold: '0x75912145f5cFEfb980616FA47B2f103210FaAb94',
    miningLocked: '0x98b3C85ac3cC3EF36Ff25A9229857AbACE3e7410',
    wishingWell: null,
    strength: '0xb8828c687Fb1C875D5acb4281C5CDf9F49fA4637',
    agility: '0x801b7296f106d8818DA1D04Ed769e5a76e8911fe',
    intelligence: '0xD8cCf866959830a8E397442B5F7DDD790F230962',
    wisdom: '0x0832A218c2202088A1800D424248fC689ae74600',
    luck: '0x81fA8a2bfcd703dc83c5d4bEE1075899448A5CdE',
    dexterity: '0x9ec92963d0387bA57D5f2D505319b1c135C6f1D3',
    vitality: '0xE3edf52D33F2BB05DBdA5BA73903E27a9B9b7e9d',
    endurance: '0xBD391e4641E1bce989a246602EcDC746efA9d845'
  };

  tokenAddresses: Item[] = [
    {
      address: '0x04b9dA42306B023f3572e106B11D82aAd9D32EBb',
      symbol: 'CRYSTAL',
      color: 'yellow',
      contract: 'erc20',
      decimals: 18,
      name: 'Crystal',
      vendorValue: 0
    },
    {
      address: '0x6e7185872bcdf3f7a6cbbe81356e50daffb002d2',
      symbol: 'XCRYSTAL',
      contract: 'erc20',
      decimals: 18,
      name: 'xCrystal',
      vendorValue: 0
    },
    {
      address: '0x4f60a160D8C2DDdaAfe16FCC57566dB84D674BD6',
      symbol: 'JEWEL',
      color: 'yellow',
      decimals: 18,
      name: 'Jewel',
      vendorValue: 0
    },
    {
      address: '0xCCb93dABD71c8Dad03Fc4CE5559dC3D89F67a260',
      symbol: 'wJEWEL',
      color: 'yellow',
      contract: 'erc20',
      name: 'Jewel',
      vendorValue: 0,
      decimals: 18
    },
    {
      address: '0x77f2656d04E158f915bC22f07B779D94c1DC47Ff',
      symbol: 'XJEWEL',
      contract: 'erc20',
      name: 'xJEWEL',
      vendorValue: 0,
      decimals: 18
    },
    {
      address: '0x576C260513204392F0eC0bc865450872025CB1cA',
      symbol: 'DFKGOLD',
      color: 'grey',
      contract: 'erc20',
      name: 'DFK Gold',
      vendorValue: 0,
      decimals: 3
    },
    {
      address: '0x79fE1fCF16Cc0F7E28b4d7B97387452E3084b6dA',
      symbol: 'DFKTEARS',
      contract: 'erc20',
      name: "Gaia's Tears",
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0xB78d5580d6D897DE60E1A942A5C1dc07Bc716943',
      symbol: 'DFKAMBRTFY',
      contract: 'erc20',
      name: 'Ambertaffy',
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0xA2cef1763e59198025259d76Ce8F9E60d27B17B5',
      symbol: 'DFKMILKWEED',
      contract: 'erc20',
      name: 'Milkweed',
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0x848Ac8ddC199221Be3dD4e4124c462B806B6C4Fd',
      symbol: 'DFKDRKWD',
      contract: 'erc20',
      name: 'Darkweed',
      vendorValue: 0,
      decimals: 0
    },
    {
      address: '0x0096ffda7A8f8E00e9F8Bbd1cF082c14FA9d642e',
      symbol: 'DFKGLDVN',
      contract: 'erc20',
      name: 'Goldvein',
      vendorValue: 100,
      decimals: 0
    },
    {
      address: '0x3E022D84D397F18743a90155934aBAC421D5FA4C',
      symbol: 'DFKSPIDRFRT',
      contract: 'erc20',
      decimals: 0,
      name: 'SpiderFruit',
      vendorValue: 0
    },
    {
      address: '0x137995beEEec688296B0118131C1052546475fF3',
      symbol: 'DFKRGWD',
      contract: 'erc20',
      decimals: 0,
      name: 'Ragweed',
      vendorValue: 2.5
    },
    {
      address: '0x473A41e71618dD0709Ba56518256793371427d79',
      symbol: 'DFKRDLF',
      contract: 'erc20',
      decimals: 0,
      name: 'Redleaf',
      vendorValue: 0
    },
    {
      address: '0x60170664b52c035Fcb32CF5c9694b22b47882e5F',
      symbol: 'DFKRCKRT',
      contract: 'erc20',
      decimals: 0,
      name: 'Rockroot',
      vendorValue: 0
    },
    {
      address: '0x0776b936344DE7bd58A4738306a6c76835ce5D3F',
      symbol: 'DFKBLUESTEM',
      contract: 'erc20',
      decimals: 0,
      name: 'Blue Stem',
      vendorValue: 0
    },
    {
      address: '0x97b25DE9F61BBBA2aD51F1b706D4D7C04257f33A',
      symbol: 'DFKSWFTHSL',
      contract: 'erc20',
      decimals: 0,
      name: 'Swift-Thistle',
      vendorValue: 0
    },
    {
      address: '0xe7a1B580942148451E47b92e95aEB8d31B0acA37',
      symbol: 'DFKFROSTDRM',
      contract: 'erc20',
      decimals: 0,
      name: 'Frost Drum',
      vendorValue: 2.5
    },
    {
      address: '0xBcdD90034eB73e7Aec2598ea9082d381a285f63b',
      symbol: 'DFKKNAPROOT',
      contract: 'erc20',
      decimals: 0,
      name: 'Knaproot',
      vendorValue: 15
    },
    {
      address: '0x80A42Dc2909C0873294c5E359e8DF49cf21c74E4',
      symbol: 'DFKSHAGCAP',
      contract: 'erc20',
      decimals: 0,
      name: 'Shaggy Caps',
      vendorValue: 100
    },
    {
      address: '0xc6030Afa09EDec1fd8e63a1dE10fC00E0146DaF3',
      symbol: 'DFKSKNSHADE',
      contract: 'erc20',
      decimals: 0,
      name: 'Skunk Shade',
      vendorValue: 0
    },
    {
      address: '0x268CC8248FFB72Cd5F3e73A9a20Fa2FF40EfbA61',
      symbol: 'DFKBLOATER',
      contract: 'erc20',
      decimals: 0,
      name: 'Bloater',
      vendorValue: 2.5
    },
    {
      address: '0x04B43D632F34ba4D4D72B0Dc2DC4B30402e5Cf88',
      symbol: 'DFKIRONSCALE',
      contract: 'erc20',
      decimals: 0,
      name: 'Ironscale',
      vendorValue: 0
    },
    {
      address: '0xc2Ff93228441Ff4DD904c60Ecbc1CfA2886C76eB',
      symbol: 'DFKLANTERNEYE',
      contract: 'erc20',
      decimals: 0,
      name: 'Lanterneye',
      vendorValue: 0
    },
    {
      address: '0x68eE50dD7F1573423EE0Ed9c66Fc1A696f937e81',
      symbol: 'DFKREDGILL',
      contract: 'erc20',
      decimals: 0,
      name: 'Redgill',
      vendorValue: 15
    },
    {
      address: '0x7f46E45f6e0361e7B9304f338404DA85CB94E33D',
      symbol: 'DFKSAILFISH',
      contract: 'erc20',
      decimals: 0,
      name: 'Sailfish',
      vendorValue: 0
    },
    {
      address: '0xd44ee492889C078934662cfeEc790883DCe245f3',
      symbol: 'DFKSHIMMERSKIN',
      contract: 'erc20',
      decimals: 0,
      name: 'Shimmerskin',
      vendorValue: 0
    },
    {
      address: '0xA7CFd21223151700FB82684Cd9c693596267375D',
      symbol: 'DFKSILVERFIN',
      contract: 'erc20',
      decimals: 0,
      name: 'Silverfin',
      vendorValue: 100
    },
    {
      address: '0x3bcb9A3DaB194C6D8D44B424AF383E7Db51C82BD',
      symbol: 'DFKFBLOATER',
      contract: 'erc20',
      decimals: 0,
      name: 'Frost Bloater',
      vendorValue: 2.5
    },
    {
      address: '0xE7CB27ad646C49dC1671Cb9207176D864922C431',
      symbol: 'DFKSPCKLTL',
      contract: 'erc20',
      decimals: 0,
      name: 'Speckle Tail',
      vendorValue: 15
    },
    {
      address: '0x60A3810a3963f23Fa70591435bbe93BF8786E202',
      symbol: 'DFKKINGPNCR',
      contract: 'erc20',
      decimals: 0,
      name: 'King Pincer',
      vendorValue: 100
    },
    {
      address: '0x6513757978E89e822772c16B60AE033781A29A4F',
      symbol: 'DFKTHREEL',
      contract: 'erc20',
      decimals: 0,
      name: 'Three Eyed Eel',
      vendorValue: 0
    },
    {
      address: '0x75E8D8676d774C9429FbB148b30E304b5542aC3d',
      symbol: 'DFKSHVAS',
      contract: 'erc20',
      decimals: 0,
      name: 'Shvas Rune',
      vendorValue: 0
    },
    {
      address: '0xCd2192521BD8e33559b0CA24f3260fE6A26C28e4',
      symbol: 'DFKMOKSHA',
      contract: 'erc20',
      decimals: 0,
      name: 'Moksha Rune',
      vendorValue: 0
    },
    {
      address: '0xa61Bac689AD6867a605633520D70C49e1dCce853',
      symbol: 'DFKBLUEEGG',
      color: 'blue',
      contract: 'erc20',
      decimals: 0,
      name: 'Blue Pet Egg',
      vendorValue: 0
    },
    {
      address: '0x8D2bC53106063A37bb3DDFCa8CfC1D262a9BDCeB',
      symbol: 'DFKGREENEGG',
      color: 'green',
      contract: 'erc20',
      decimals: 0,
      name: 'Green Pet Egg',
      vendorValue: 0
    },
    {
      address: '0x7E121418cC5080C96d967cf6A033B0E541935097',
      symbol: 'DFKGREGG',
      color: 'grey',
      contract: 'erc20',
      decimals: 0,
      name: 'Grey Pet Egg',
      vendorValue: 0
    },
    {
      address: '0x72F860bF73ffa3FC42B97BbcF43Ae80280CFcdc3',
      symbol: 'DFKYELOWEGG',
      color: 'yellow',
      contract: 'erc20',
      decimals: 0,
      name: 'Yellow Pet Egg',
      vendorValue: 0
    },
    {
      address: '0xf2D479DaEdE7F9e270a90615F8b1C52F3C487bC7',
      symbol: 'DFKGOLDEGG',
      color: 'yellowBright',
      contract: 'erc20',
      decimals: 0,
      name: 'Golden Egg',
      vendorValue: 0
    },
    {
      address: '0x242078edFDca25ef2A497C8D9f256Fd641472E5F',
      symbol: 'DFKSTMNPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Stamina Vial',
      vendorValue: 0
    },
    {
      address: '0x84246Ce3988742D46fC00d9b8b2AFb5CDBDaE660',
      symbol: 'DFKSWFTPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Swiftness Potion',
      vendorValue: 0
    },
    {
      address: '0x591853e01EcFDcF1Bdc9f093423C197BfBBd1A4f',
      symbol: 'DFKHLTHPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Health Vial',
      vendorValue: 0
    },
    {
      address: '0x5948dd8Df6afEFE05B033AD8f3ae513a9Cd4F1Dc',
      symbol: 'DFKFHLTHPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Full Health Potion',
      vendorValue: 0
    },
    {
      address: '0x449eB718e351a86718A090A1a8Db3FD561306d9b',
      symbol: 'DFKANTPSN',
      contract: 'erc20',
      decimals: 0,
      name: 'Anti-poison Potion',
      vendorValue: 0
    },
    {
      address: '0x2dfFf745d2c7ddCAD4E97b80DF33705B1a95A172',
      symbol: 'DFKTFNSPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Toughness Potion',
      vendorValue: 0
    },
    {
      address: '0x240da5314B05E84392e868aC8f2b80ad6becadd4',
      symbol: 'DFKMNPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Mana Vial',
      vendorValue: 0
    },
    {
      address: '0xf17FD21bDF6713a1Dfed668b97835b21e32651e8',
      symbol: 'DFKFMNPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Full Mana Potion',
      vendorValue: 0
    },
    {
      address: '0xFADCb72aAE2713975a890b59FF47231D1A552De3',
      symbol: 'DFKMGCRSPTN',
      contract: 'erc20',
      decimals: 0,
      name: 'Magic Resistance Potion',
      vendorValue: 0
    },
    {
      address: '0x5986045e7c221c8AD40A736B6434D82E29687aeB',
      symbol: 'DFKANTBLND',
      contract: 'erc20',
      decimals: 0,
      name: 'Anti-blinding Potion',
      vendorValue: 0
    },
    {
      address: '0xeEe5b16Cc49e7cef65391Fe7325cea17f787e245',
      symbol: 'DFKLCHSCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Chaos Crystal',
      vendorValue: 0
    },
    {
      address: '0x9d9ef1Bf6A46b8413bf6b1b54F6A7aAb53c6b1b6',
      symbol: 'DFKLFINCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Finesse Crystal',
      vendorValue: 0
    },
    {
      address: '0xbd2677c06C9448534A851bdD25dF045872b87cb1',
      symbol: 'DFKLFRTICR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Fortitude Crystal',
      vendorValue: 0
    },
    {
      address: '0xE410b2BE2Ce1508E15009118567d02C6d7A7038e',
      symbol: 'DFKLFRTUCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Fortune Crystal',
      vendorValue: 0
    },
    {
      address: '0xbb5F97358F60cCBa262883A3Ff0C637393FE3aB8',
      symbol: 'DFKLINSCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Insight Crystal',
      vendorValue: 0
    },
    {
      address: '0x5bAC3cAd961B01Ef9510C8e6c5402A2bB1542831',
      symbol: 'DFKLMGHTCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Might Crystal',
      vendorValue: 0
    },
    {
      address: '0x6BCA53314dADdA7f4De30A95413f75a93bfAfecF',
      symbol: 'DFKLSWFTCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Swiftness Crystal',
      vendorValue: 0
    },
    {
      address: '0x5e4Cf6907CB5fBe2F642E399F6d07E567155d1F8',
      symbol: 'DFKLVGRCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Vigor Crystal',
      vendorValue: 0
    },
    {
      address: '0xC989c916F189D2A2BE0322c020942d7c43aEa830',
      symbol: 'DFKLWITCR',
      contract: 'erc20',
      decimals: 0,
      name: 'Lesser Wit Crystal',
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 1',
      uri: 0,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 2',
      uri: 1,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 3',
      uri: 2,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 4',
      uri: 3,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 5',
      uri: 4,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 6',
      uri: 5,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 7',
      uri: 6,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 8',
      uri: 7,
      vendorValue: 0
    },
    {
      address: '0xA37851cCE4B2b65c0b290AA4cC2DFF00314ec85a',
      symbol: 'DFKETRNLSTY',
      contract: 'eternalStory',
      decimals: 0,
      name: 'Eternal Story - Page 9',
      uri: 8,
      vendorValue: 0
    }
  ];
}
