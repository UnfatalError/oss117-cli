interface IOSS117ApiService {
    getRandomQuote(): Promise<string | undefined>;
    getRandomQuotes(amount: number): Promise<string[]>;
    getRandomQuotesFromCharacter(character: string, amount: number): Promise<string[]>;
    getRandomQuotesFromCharacterContaining(character: string, keyword: string, amount: number): Promise<string[]>;
    getRandomQuotesContaining(keyword: string, amount: number): Promise<string[]>;
}