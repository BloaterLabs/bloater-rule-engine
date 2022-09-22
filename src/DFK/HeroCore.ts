import { Provider } from '@ethersproject/providers';
import { Contract } from 'ethers';
import heroCoreAbi = require('./abis/HeroCore.json');
import { GeneProperties } from './constants/GeneProperties';
import { Addresses } from './models/Addresses/Addresses';
import { Hero } from './models/Hero';
import { HeroStats } from './models/HeroStats';
import { Professions } from './models/Professions';

export class HeroCore {
    private heroesContract: Contract;

    private statGeneMap = {
        0: 'class',
        1: 'subClass',
        2: 'profession',
        3: 'passive1',
        4: 'passive2',
        5: 'active1',
        6: 'active2',
        7: 'statBoost1',
        8: 'statBoost2',
        9: 'statsUnknown1',
        10: 'element',
        11: 'statsUnknown2',
    };

    constructor(
        private addresses: Addresses,
        provider: Provider) {

        this.heroesContract = new Contract(this.addresses.contractAddresses.heroCore, heroCoreAbi, provider);
    }

    async getHeroes(address: string): Promise<Hero[]> {
        const heroes: Hero[] = [];

        const heroIds = await this.heroesContract.getUserHeroes(address);

        await Promise.all(heroIds.map(async (heroId: number) => {
            const heroOriginal = await this.heroesContract.getHero(heroId);

            const heroStats: HeroStats = {
                agility: heroOriginal.stats.agility,
                dexterity: heroOriginal.stats.dexterity,
                endurance: heroOriginal.stats.endurance,
                hp: heroOriginal.stats.hp,
                intelligence: heroOriginal.stats.intelligence,
                luck: heroOriginal.stats.luck,
                mp: heroOriginal.stats.mp,
                stamina: heroOriginal.stats.stamina,
                strength: heroOriginal.stats.strength,
                vitality: heroOriginal.stats.vitality,
                wisdom: heroOriginal.stats.wisdom
            };

            const professions: Professions = {
                fishing: heroOriginal.professions.fishing,
                foraging: heroOriginal.professions.foraging,
                gardening: heroOriginal.professions.gardening,
                mining: heroOriginal.professions.mining
            };

            const staminaFullAt = new Date(heroOriginal.state.staminaFullAt * 1000);
            
            // todo: make a model for this.
            const statGenes = this.mapToGenes(BigInt(heroOriginal.info.statGenes), this.statGeneMap);

            const hero: Hero = {
                id: heroId,
                maxStamina: heroOriginal.info.stamina,
                name: `${heroOriginal.info.firstName} ${heroOriginal.info.lastName}`,
                //quest: this.addresses.addressesQuests[heroOriginal.state.currentQuest],
                profession: statGenes["profession"], //heroOriginal.statGenes.professionDescr,
                professions: professions,
                questAddress: heroOriginal.state.currentQuest,
                stats: heroStats,
                status: heroOriginal.state.status,
                staminaFullAt: staminaFullAt,

                currentStamina: this.getCurrentStamina(staminaFullAt, heroStats.stamina)
            };

            heroes.push(hero);
        }));

        return heroes;
    }

    /**
     * Calculate the current stamina for hero.
     */
    private getCurrentStamina(staminaFullAt: Date, maxStamina: number): number {
        // 20 minutes per stamina * 60000 to convert to ms
        const millisecondsPerStamina = 20 * 60000;

        if (staminaFullAt.valueOf() <= Date.now()) {
            return maxStamina;
        }

        const millisecondsToFull =
            staminaFullAt.valueOf() - Date.now();

        const staminaLeft =
            maxStamina - Math.ceil(millisecondsToFull / millisecondsPerStamina);

        return staminaLeft;
    };

    private mapToGenes(genesStr: bigint, genesMap) {
        var rawKai = this.genesToKai(genesStr)
                        .split(' ')
                        .join('');

        const genes = { recessives: {} };

        let count = 0;

        for (const k in rawKai.split('')) {
            if (Object.prototype.hasOwnProperty.call(rawKai, k)) {
                const trait = genesMap[Math.floor(Number(k) / 4)];
                const kai = rawKai[k];
                const valueNum = this.kai2dec(kai);

                // Create base genes
                genes[trait] = GeneProperties.traits[valueNum];

                // Create recessives
                if (!genes.recessives[trait]) {
                    genes.recessives[trait] = {};
                }

                if (Object.keys(genes.recessives[trait]).length < 3) {
                    count += 1;
                    const position = 4 - count;
                    genes.recessives[trait] = {
                        ...genes.recessives[trait],
                        [`r${position}`]: GeneProperties.traits[valueNum],
                    };
                } else {
                    genes.recessives[trait] = {
                        ...genes.recessives[trait],
                        d: GeneProperties.traits[valueNum],
                    };
                    count = 0;
                }
            }
        }

        return genes;
    }

    private genesToKai(genes: bigint) {
        //genes = BigInt(genes);
        const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
        const BASE = BigInt(ALPHABET.length);

        let buf = '';
        while (genes >= BASE) {
            const mod = genes % BASE;
            buf = ALPHABET[Number(mod)] + buf;
            genes = (genes - mod) / BASE;
        }

        // Add the last 4 (finally).
        buf = ALPHABET[Number(genes)] + buf;

        // Pad with leading 0s.
        buf = buf.padStart(48, '1');

        const out = buf.replace(/(.{4})/g, '$1 ');
        return out;
    }

    private kai2dec = (kai) => {
        const ALPHABET = '123456789abcdefghijkmnopqrstuvwx';
        return ALPHABET.indexOf(kai);
    };
}