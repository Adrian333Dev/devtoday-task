// Interfaces
export interface ICountry {
  countryCode: string;
  name: string;
}

export interface ICountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders?: string[];
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
  types: HolidayTypes;
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
