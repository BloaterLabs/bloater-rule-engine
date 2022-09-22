import { Addresses } from "../models/Addresses/Addresses";
import { ContractAddresses } from "../models/Addresses/ContractAddresses";
import { QuestAddresses } from "../models/Addresses/QuestAddresses";

export class DFKChainAddresses implements Addresses {
    contractAddresses: ContractAddresses = {
        heroCore: "0xEb9B61B145D6489Be575D3603F4a704810e143dF",
        questCoreV1: null,
        questCoreV2: "0xE9AbfBC143d7cef74b5b793ec5907fa62ca53154"
    };

    questAddresses: QuestAddresses = {
        none: "0x0000000000000000000000000000000000000000",
        fishing: "0x407ab39B3675f29A719476af6eb3B9E5d93969E6",
        foraging: "0xAd51199B453075C73FA106aFcAAD59f705EF7872",
        gardeningCrystalAvax: "0x8eDA0ceA7a90E794B33708Cc0768727A1A612f3d",
        gardeningCrystalEth: "0x810e1fF51fDd58c474c66A31013713D1A17BF458",
        gardeningCrystalJewel: "0xC4839Fb9A5466878168EaE3fD58c647B71475b61",
        gardeningCrystalUSDC: "0x6FEF23498877bC4c3940ebE121dd7D138BdA4e11",
        gardeningJewelBtc: "0x3391B9384AC66C7Aa3BF4A75A4f441942B1dCf30",
        miningGold: "0x75912145f5cFEfb980616FA47B2f103210FaAb94",
        miningJewel: "0x98b3C85ac3cC3EF36Ff25A9229857AbACE3e7410",
        wishingWell: null,
        strength: "0xb8828c687Fb1C875D5acb4281C5CDf9F49fA4637",
        agility: "0x801b7296f106d8818DA1D04Ed769e5a76e8911fe",
        intelligence: "0xD8cCf866959830a8E397442B5F7DDD790F230962",
        wisdom: "0x0832A218c2202088A1800D424248fC689ae74600",
        luck: "0x81fA8a2bfcd703dc83c5d4bEE1075899448A5CdE",
        dexterity: "0x9ec92963d0387bA57D5f2D505319b1c135C6f1D3",
        vitality: "0xE3edf52D33F2BB05DBdA5BA73903E27a9B9b7e9d",
        endurance: "0xBD391e4641E1bce989a246602EcDC746efA9d845"
    };
}
    