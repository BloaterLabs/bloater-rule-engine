export interface Item {
    // color: string; // if we want to give a color for logs.
    address: string;
    abbreviation: string;
    decimals: number;
    name: string;
    // quantity: number; // I think this might need to be a big number. Having this on an item feels weird but think it would be annoying keeping track elsewhere.
    vendorValue: number;
}