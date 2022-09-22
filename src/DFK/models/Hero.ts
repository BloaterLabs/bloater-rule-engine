import { HeroStats } from "./HeroStats";
import { HeroStatus } from "./HeroStatus";
import { Profession } from "./Profession";
import { Professions } from "./Professions";

export interface Hero {
    currentStamina: number;

    id: number;

    maxStamina: number;

    name: string;

    //quest: string;
    profession: typeof Profession;

    professions: Professions;

    questAddress: string;

    staminaFullAt: Date;

    stats: HeroStats;

    // todo: I think we're doing two different statuses here compared to what is on the original object.
    status: HeroStatus;
}