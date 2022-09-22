import { BigNumber } from "ethers";

export class ActiveQuest {
    id: BigNumber;
    questAddress: string;
    level: number;
    heroes: BigNumber[];
    player: string;
    startBlock: number;
    startAt: Date;
    completeAt: Date;
    attempts: number;
    status: number;
    quest: string;

    get isComplete(): boolean {
        return this.completeAt.valueOf() < Date.now();
    }
}