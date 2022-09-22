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
        gardeningBtcUsdc: "0x045838dBfb8026520E872c8298F4Ed542B81Eaca",
        gardeningCrystalAvax: "0x8eDA0ceA7a90E794B33708Cc0768727A1A612f3d",
        gardeningCrystalBtc: "0x706916dbC3b66d89632708CC193080ea05E0534A",
        gardeningCrystalEth: "0x810e1fF51fDd58c474c66A31013713D1A17BF458",
        gardeningCrystalJewel: "0xC4839Fb9A5466878168EaE3fD58c647B71475b61",
        gardeningCrystalKlay: "0x1fCc67a01525fd715A67bCcbF73665Fb3dBE76c7",
        gardeningCrystalUsdc: "0x6FEF23498877bC4c3940ebE121dd7D138BdA4e11",
        gardeningEthUsdc: "0xdeF7cBeE7d0B62037616ee26BCAc1C8364f53476",
        gardeningJewelAvax: "0xA0d17554F09047d65E0ae0e76CD8923A9525183c",
        gardeningJewelBtc: "0x3391B9384AC66C7Aa3BF4A75A4f441942B1dCf30",
        gardeningJewelEth: "0xbaEc39Dd81b964B57bc5fa5f5421Cd82185409E6",
        gardeningJewelKlay: "0x2A70aA48f9dBF859239ae5E7f98fe95aE27A6CD4",
        gardeningJewelUsdc: "0xaac3933Faa3B668304C9276d10CA88853463BD42",
        gardeningJewelXJewel: "0xd3d8ff8e42C2eD51FabE4BA34080C6ac79395f24",
        miningGold: "0x75912145f5cFEfb980616FA47B2f103210FaAb94",
        miningLocked: "0x98b3C85ac3cC3EF36Ff25A9229857AbACE3e7410",
        wishingWell: null,
        strength: "0xb8828c687Fb1C875D5acb4281C5CDf9F49fA4637",
        agility: "0x801b7296f106d8818DA1D04Ed769e5a76e8911fe",
        intelligence: "0xD8cCf866959830a8E397442B5F7DDD790F230962",
        wisdom: "0x0832A218c2202088A1800D424248fC689ae74600",
        luck: "0x81fA8a2bfcd703dc83c5d4bEE1075899448A5CdE",
        dexterity: "0x9ec92963d0387bA57D5f2D505319b1c135C6f1D3",
        vitality: "0xE3edf52D33F2BB05DBdA5BA73903E27a9B9b7e9d",
        endurance: "0xBD391e4641E1bce989a246602EcDC746efA9d845",
    };
}