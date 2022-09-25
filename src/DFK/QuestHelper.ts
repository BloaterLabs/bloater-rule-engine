import { QuestAddresses } from "./models/Addresses/QuestAddresses";

export class QuestHelper {
    /**
     * 
     * @param questAddresses all of the quest addresses. This will vary depending on the chain you are on.
     * @param address the address of the quest you want to know the name of. The name will currently be 
     * the property name so not the friendliest.
     * @returns The name of the quest according to its name on the class.
     */
    static getQuestName(questAddresses: QuestAddresses, address: string): string {
        // todo: probably cache the results for these in a dictionary or something even though probably not too slow.
        for (const questName in questAddresses) {
            if (questAddresses[questName] === address) {
                return questName;
            }
        }
    }
}