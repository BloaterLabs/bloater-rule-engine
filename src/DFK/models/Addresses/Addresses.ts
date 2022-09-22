import { ContractAddresses } from "./ContractAddresses";
import { QuestAddresses } from "./QuestAddresses";

export interface Addresses {
    readonly contractAddresses: ContractAddresses;
    readonly questAddresses: QuestAddresses;
}