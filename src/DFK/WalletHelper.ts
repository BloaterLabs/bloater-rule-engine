import { ethers, Wallet } from "ethers";
import { providers } from "ethers"
import * as fs from "fs";
import * as readline from "readline";

export class WalletHelper {
    public async createWallet(path: string, provider: providers.Provider, password: string = null) {
        if (!password) {
            password = await this.getInput('Password:', 'password');
        }
        const privateKey = await this.getInput('Private key: ', 'private key');

        const wallet = new Wallet(privateKey, provider);
        const encryptedWallet = await wallet.encrypt(password);

        fs.writeFileSync(path, encryptedWallet);

        return wallet;
    }

    public async getEncryptedWallet(path: string, provider: providers.Provider, password: string = null) {
        if (!password) {
            password = await this.getInput('Password:', 'password');
        }

        try {
            const encryptedWallet = fs.readFileSync(path, 'utf8');
            const wallet = ethers.Wallet.fromEncryptedJsonSync(encryptedWallet, password);
            return wallet.connect(provider);
        } catch (ex) {
            throw new Error(
                `Unable to read encrypted wallet. Make sure you used correct password. If problem persists delete the encrypted wallet at ${path} and create again.`
            )
        }
    }

    public async getOrCreateWallet(path: string, provider: providers.Provider, password: string = null) {
        if (fs.existsSync(path)) {
            return await this.getEncryptedWallet(path, provider, password);
        }

        return await this.createWallet(path, provider, password);
    }

    private async getInput(query, inputName): Promise<string> {
        const read = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    
        try {
            let input: string = await new Promise((resolve) => {
                read.question(query, (answer) => resolve(answer));
            });

            if (!input) {
                throw new Error(
                    `No ${inputName} provided. Try running the application again, and provide a ${inputName}.`
                );
            }
                
            return input;
        } finally {
            read.close();
        }
    }
}
