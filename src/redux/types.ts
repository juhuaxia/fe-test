export interface country {
    capital: Array<string>;
    name: {
      common: string;
      official: string;
      nativeName: {
          zho: {
              official: string;
              common: string;
          }
      };
    },
    population: number;
    region: string;
    cca2: string;
  }
  
  export interface countryDetail extends country {
      tld: Array<string>,
      currencies: {
          [key: string]: {
              name: string;
              symbol: string;
          }
      },
      languages: {
          zho: string;
      },
      subregion: string;
      borders: Array<string>
  }