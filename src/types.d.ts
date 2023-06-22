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

export type TemperatureValue = {
  Value: number,
  Unit: "F" | "C",
  UnitType: number
}

export type Temperature = {
  Minimum: TemperatureValue,
  Maximum: TemperatureValue
}

export type TimeOfDayIcon = {
  Icon: number,
  IconPhrase: string,
  HasPrecipitation: boolean
}

export type DailyForecast = {
  Date: string,
  EpochDate: number,
  Temperature: Temperature,
  Day: TimeOfDayIcon,
  Night: TimeOfDayIcon,
  Sources: string[],
  MobileLink: string,
  Link: string
}

export type DailyWeatherResponse = {
  Headline: Headline,
  DailyForecasts: DailyForecast[]
}
