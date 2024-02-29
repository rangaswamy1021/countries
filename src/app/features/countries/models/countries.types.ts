export interface Country {
  id?: string;
  name?: string;
  capital?: string;
  altSpellings?: string[];
  relevance?: string;
  region?: string;
  subregion?: string;
  regtranslationsion?: {};
  population?: number;
  reglatlngion?: number[];
  demonym?: string;
  area?: number;
  gini?: number;
  timezones?: string[];
  borders?: string[];
  nativeName?: string;
  callingCodes?: string[];
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  currencies?: string[];
  languages?: {
    name: string;
    code: string;
  }[];
}
