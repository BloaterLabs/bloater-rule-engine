import { ethers, Wallet } from 'ethers';
import { Engine, Fact, RuleProperties } from 'json-rules-engine';
import { QuestCore } from './DFK/QuestCore';
import { HeroCore } from './DFK/HeroCore';
import { Hero } from './DFK/models/Hero';
import { Config } from './DFK/models/Config';
import { Addresses } from './DFK/models/Addresses/Addresses';
import { DFKChainAddresses } from './DFK/constants/DFKChainAddresses';
import { Quest } from './DFK/models';
import { ContractProvider } from './DFK/ContractProvider';

export class Ruler {
  private questCore: QuestCore;
  private heroCore: HeroCore;

  private rulesEngine: Engine;

  constructor(private wallet: Wallet, config: Config) {
    const provider = this.getProvider(config.wallet.rpc);

    let addresses: Addresses;

    switch (config.network.toLowerCase()) {
      // case "harmony":
      //     addresses = new HarmonyAddresses();
      //     break;

      case 'dfkchain':
        addresses = new DFKChainAddresses();
        break;

      default:
        throw 'unknown network in config. Current valid entries are harmony and dfkchain';
    }

    // maybe we should pass the contracts in instead of addresses and providers.
    const contractProvider = new ContractProvider(addresses.contractAddresses, provider);

    this.questCore = new QuestCore(addresses, contractProvider.getQuestCoreContract(), wallet);
    this.heroCore = new HeroCore(addresses.questAddresses, contractProvider.getHeroCoreContract());
  }

  public setupEngine() {
    this.rulesEngine = new Engine();

    // todo we could check if this fact is needed before we add.... but might not be too big deal to just include it.
    this.rulesEngine.addFact('dfk-heroes-questing', (params, almanac) =>
      almanac.factValue(params.address).then((address: string) => this.getQuestingHeroes(address))
    );

    this.rulesEngine.addFact('dfk-heroes', (params, almanac) =>
      almanac.factValue(params.address).then((address: string) => this.getHeroes(address))
    );

    this.rulesEngine.addOperator('lengthGreaterThan', (factValue: number[], jsonValue: number) => {
      return factValue.length > jsonValue;
    });

    this.rulesEngine.on('dfk-heroes-complete-quest', async (params, almanac, ruleResult) => {
      // todo: probably a cleaner way to do this. I can see this being flaky providing parameter like this.
      almanac.factValue('dfk-heroes-questing', { address: params['address'] }).then((activeQuests: Quest[]) => {
        this.completeQuests(activeQuests, this.wallet);
      });
    });

    this.rulesEngine.on('dfk-heroes-start-quest', async (params, almanac, ruleResult) => {
      // todo: probably a cleaner way to do this. I can see this being flaky providing parameter like this.
      almanac.factValue('dfk-heroes', { address: params['address'] }).then((heroes: Hero[]) => {
        console.log(ruleResult.result);
        this.startQuests(heroes, 25);
      });
    });

    this.rulesEngine.on('console.log', (event) => console.log(`console logging. ${event.params.message}`, event));
  }

  public async runRules(rules: RuleProperties[], additionalFacts: Fact[]) {
    rules.forEach((rule: RuleProperties) => {
      this.rulesEngine.addRule(rule);
    });

    await this.rulesEngine.run(additionalFacts);
  }

  public async runRulesForIndividualHeros(rules: RuleProperties[], additionalFacts: Fact[]) {
    //this.getHeroIds(address);

    rules.forEach((rule: RuleProperties) => {
      this.rulesEngine.addRule(rule);
    });

    await this.rulesEngine.run(additionalFacts);
  }

  // private handleFailures(events: Event[]): void {
  //     events.forEach(event => {
  //         console.log(`event didn't happen`, event);
  //     });
  // }

  /*** DFK STUFF. We should move this out
   *
   */
  // todo: move out.
  private async getQuestingHeroes(address: string): Promise<Quest[]> {
    const questCompleters = await this.questCore.getCompletableQuests(address);
    return questCompleters;
  }

  private async getHeroes(address: string): Promise<Hero[]> {
    const heroes = await this.heroCore.getHeroes(address);
    console.log(heroes.length);
    return heroes;
  }

  private async completeQuests(completedQuests: Quest[], wallet: Wallet): Promise<void> {
    //completedQuests.forEach(async (completedQuest) => {
    //Promise.all(completedQuests.map(async (completedQuest: ActiveQuest) => {
    for (const completedQuest of completedQuests) {
      console.log(
        `completing ${completedQuest.name} quest for ${completedQuest.heroes} on ${completedQuest.completeAt}`
      );

      await this.questCore.completeQuest(completedQuest.heroes[0]);
    }
  }

  private startQuests(heroes: Hero[], requiredStamina: number): void {
    console.log(heroes.length, requiredStamina);
    Promise.all(
      heroes.map((hero: Hero) => {
        if (hero.currentStamina >= requiredStamina && !hero.questAddress) {
          console.log(hero);
        }
      })
    );
  }

  private getProvider(rpcAddress: string) {
    // todo: probably shouldn't be making a new one every time.
    return new ethers.providers.JsonRpcProvider(rpcAddress);
  }
}
