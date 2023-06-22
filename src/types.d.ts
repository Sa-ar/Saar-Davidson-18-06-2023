export type Location = {
  Version: number;
  Key: string;
  Type: string;
  Rank: number;
  LocalizedName: string;
  Country: {
    ID: string;
    LocalizedName: string;
  };
  AdministrativeArea: {
    ID: string;
    LocalizedName: string;
  }
};

type Headline = {
  EffectiveDate: string,
  EffectiveEpochDate: number,
  Severity: number,
  Text: string,
  Category: string,
  EndDate: string | null,
  EndEpochDate: string | null,
  MobileLink: string,
  Link: string
}

type DailyForecast = {
  Date: string,
  EpochDate: number,
  Temperature: {
    Minimum: {
      Value: number,
      Unit: "F" | "C",
      UnitType: number
    },
    Maximum: {
      Value: number,
      Unit: "F" | "C",
      UnitType: number
    }
  },
  Day: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  },
  Night: {
    Icon: number,
    IconPhrase: string,
    HasPrecipitation: boolean
  },
  Sources: string[],
  MobileLink: string,
  Link: string
}

export type DailyWeatherResponse = {
  Headline: Headline,
  DailyForecasts: DailyForecast[]
}
