// Interfaces
export interface ICountry {
  countryCode: string;
  name: string;
  nextHoliday?: IHoliday;
}

export interface ICountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: ICountryBorder[];
}

export interface IHoliday {
  date?: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed?: true;
  global?: true;
  counties?: string[];
  launchYear?: number;
  types: HolidayTypes[];
}

export interface ICountryBorder {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[] | null;
}

// Enums
export enum HolidayTypes {
  Public,
  Bank,
  School,
  Authorities,
  Optional,
  Observance,
}
