import { Command } from 'commander';
import { LIB_VERSION } from './version';

export class OSS117CLI {
    private _program: Command;
    private _options: any;

    constructor(private _service: IOSS117ApiService) {
        this._program = new Command();
        this.configure();
        this.parseArgs();
    }

    public async execute() {
        const numberOfQuotes = this._options.number ?? 1;
        let quotes: string[] = [];
        
        if (this._options.keyword && this._options.character) {
            quotes = await this._service.getRandomQuotesFromCharacterContaining(
                this._options.character,
                this._options.keyword,
                numberOfQuotes
            );
        }
        else if (this._options.keyword) {
            quotes = await this._service.getRandomQuotesContaining(this._options.keyword, numberOfQuotes);
        }
        else if (this._options.character) {
            quotes = await this._service.getRandomQuotesFromCharacter(this._options.character, numberOfQuotes);
        }
        else if (this._options.number) {
            quotes = await this._service.getRandomQuotes(numberOfQuotes);
        }
        else {
            let quote = await this._service.getRandomQuote();
            quotes = [quote ?? ''];
        }

        if (quotes.length === 0) {
            console.log('OSS 117 API returned no data... No quote for today!');
            return;
        }

        quotes.forEach(quote => {
            console.log('\"' + quote + '\"');
        });
    }

    private configure() {
        this._program
            .option('-n --number <number>', 'Displays x random quotes.')
            .option('-c --character <string>', 'Displays a random quote from the specified character.')
            .option('-k --keyword <string>', 'Displays a random quote containing the keyword.')
            .description('Welcome to the OSS 117 unofficial CLI!')
            .version(LIB_VERSION, '-v --version');
    }

    private parseArgs() {
        this._program.parse();
        this._options = this._program.opts();
    }
}
