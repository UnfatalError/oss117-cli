import axios from 'axios';

export class OSS117ApiService implements IOSS117ApiService {
    private readonly _apiUrl = 'https://api.oss117quotes.xyz/v1';

    public async getRandomQuote() : Promise<string | undefined> {
        const endpoint = `/random`;
        const randomResponse: Quote = await this.getApiResponseFromEndpoint(endpoint);
        return randomResponse.sentence ?? undefined;
    }

    public async getRandomQuotes(amount: number = 1): Promise<string[]> {
        const endpoint = `/random/${amount}`;
        const quotes: Quote[] | Quote = await this.getApiResponseFromEndpoint(endpoint);
        const quotesArray = Array.isArray(quotes) ? quotes : [quotes];
        return quotesArray.flatMap((quote) => quote.sentence ?? []);
    }

    public async getRandomQuotesFromCharacter(character: string, amount: number = 1): Promise<string[]> {
        let endpoint = `/author/${character}`;
        if (amount > 1){
            endpoint += `/${amount}`;
        }
        const quotes: Quote[] | Quote = await this.getApiResponseFromEndpoint(endpoint);
        const quotesArray = Array.isArray(quotes) ? quotes : [quotes];
        return quotesArray.flatMap(quote => quote.sentence ?? []);
    }

    public async getRandomQuotesContaining(keyword: string, amount: number = 1): Promise<string[]> {
        const endpoint = `/characters`;
        const characters: Character[] | Character = await this.getApiResponseFromEndpoint(endpoint);
        const charactersArray = Array.isArray(characters) ? characters : [characters];
        return this.getRandomElementsFromArray(charactersArray
            .flatMap(character => character.quotes)
            .filter(quote => quote.includes(keyword)), amount);
    }
    
    public async getRandomQuotesFromCharacterContaining(character: string, keyword: string, amount: number = 1): Promise<string[]> {
        const endpoint = `/character/${character}`;
        const characters: Character[] | Character = await this.getApiResponseFromEndpoint(endpoint);
        const charactersArray = Array.isArray(characters) ? characters : [characters];
        return this.getRandomElementsFromArray(charactersArray
            .flatMap(character => character.quotes)
            .filter(quote => quote.includes(keyword)), amount);
    }
    
    private async getApiResponseFromEndpoint(endpoint: string) {
        let url = `${this._apiUrl}${endpoint}`;
        const response = await axios.get(url);
        return response.data;
    }

    private getRandomElementsFromArray(array: any[], amount: number) {
        const max = array.length;
        amount = amount > max ? max : amount;
        let indexes: number[] = [];
        while (indexes.length < amount) {
            const random = Math.floor(Math.random() * max);
            if (!indexes.includes(random)) {
                indexes.push(random);
            }
        }

        return indexes.map(index => array[index]);
    }
}