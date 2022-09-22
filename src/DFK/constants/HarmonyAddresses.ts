// import { Addresses } from "../models/Addresses/Addresses";
// import { ContractAddresses } from "../models/Addresses/ContractAddresses";
// import { QuestAddresses } from "../models/Addresses/QuestAddresses";

// export class HarmonyAddresses implements Addresses {
//     readonly contractAddresses: ContractAddresses = {
//         heroCore: "0x5F753dcDf9b1AD9AabC1346614D1f4746fd6Ce5C",
//         questCoreV1: "0x5100Bd31b822371108A0f63DCFb6594b9919Eaf4",
//         questCoreV2: "0xAa9a289ce0565E4D6548e63a441e7C084E6B52F6"
//     };

//     readonly questAddresses: QuestAddresses = {
//         "none": "0x0000000000000000000000000000000000000000",
//         "fishing": "0xADFFD2A255B3792873a986895c6312e8FbacFc8B",
//         "foraging": "0xB465F4590095daD50FEe6Ee0B7c6700AC2b04dF8",
//         //"gardening": "0xe4154B6E5D240507F9699C730a496790A722DF19",
//         "gardeningJewelBtc": null,
//         "gardeningJewelBtc": null,
//         "miningGold": "0x569E6a4c2e3aF31B337Be00657B4C040C828Dd73",
//         "miningJewel": "0x6FF019415Ee105aCF2Ac52483A33F5B43eaDB8d0",
//         "wishingWell": "0x35e9adF3F63dEeE6a266494BB0ad7627472A518F",
//         "strength": "0xf60AF3a32Bb94e395E17C70aB695d968F37Bd2e4",
//         "agility": "0xFA20B218927B0f57a08196743488c7C790a5625B",
//         "intelligence": "0x6176EedE1AE9127D59266f197Ad598653E4F8c92",
//         "wisdom": "0x347097454fA1931A4e80dcDebb31F29FC355CbCE",
//         "luck": "0x13E74E4E64805E7fdA381C9BEF1e77cd16086E56",
//         "dexterity": "0xe03fd4e2F6421b1251297240cE5248508C9104eD",
//         "vitality": "0x2174bBeFbEFBD766326a7C7538f93a78Db3eD449",
//         "endurance": "0xCb594A24D802cdF65000A84dC0059dde11c9d15f"
//     };

//     // todo: probably easier way to do this but can't think of it right now.
//     // static readonly addressesQuests = {
//     //     [this.questAddresses.fishing]: "fishing",
//     //     [this.questAddresses.foraging]: "foraging",
//     //     [this.questAddresses.gardening]: "gardening",
//     //     [this.questAddresses.miningGold]: "mining-gold",
//     //     [this.questAddresses.miningJewel]: "mining-jewel",
//     //     [this.questAddresses.wishingWell]: "wishing-well",
//     //     [this.questAddresses.strength]: "strength",
//     //     [this.questAddresses.agility]: "agility",
//     //     [this.questAddresses.intelligence]: "intelligence",
//     //     [this.questAddresses.wisdom]: "wisdom",
//     //     [this.questAddresses.luck]: "luck",
//     //     [this.questAddresses.dexterity]: "dexterity",
//     //     [this.questAddresses.vitality]: "vitality",
//     //     [this.questAddresses.endurance]: "endurance"
//     // };

//     // addressesQuests = {
//     //     [this.questAddresses.fishing]: "fishing",
//     //     "0xB465F4590095daD50FEe6Ee0B7c6700AC2b04dF8": "foraging",
//     //     "0xe4154B6E5D240507F9699C730a496790A722DF19": "gardening",
//     //     "0x569E6a4c2e3aF31B337Be00657B4C040C828Dd73": "mining-gold",
//     //     "0x6FF019415Ee105aCF2Ac52483A33F5B43eaDB8d0": "mining-jewel",
//     //     "0x35e9adF3F63dEeE6a266494BB0ad7627472A518F": "wishing-well",
//     //     "0xf60AF3a32Bb94e395E17C70aB695d968F37Bd2e4": "strength",
//     //     "0xFA20B218927B0f57a08196743488c7C790a5625B": "agility",
//     //     "0x6176EedE1AE9127D59266f197Ad598653E4F8c92": "intelligence",
//     //     "0x347097454fA1931A4e80dcDebb31F29FC355CbCE": "wisdom",
//     //     "0x13E74E4E64805E7fdA381C9BEF1e77cd16086E56": "luck",
//     //     "0xe03fd4e2F6421b1251297240cE5248508C9104eD": "dexterity",
//     //     "0x2174bBeFbEFBD766326a7C7538f93a78Db3eD449": "vitality",
//     //     "0xCb594A24D802cdF65000A84dC0059dde11c9d15f": "endurance"
//     // };
// }