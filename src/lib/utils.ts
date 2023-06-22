import { Temperature } from "@/types";

export function fahrenheitToCelsius(fahrenheit: number) {
  return (fahrenheit - 32) * 5 / 9;
}

export function celsiusToFahrenheit(celsius: number) {
  return (celsius * 9 / 5) + 32;
}

export function getDayOfWeek(date: string) {
  return new Date(date).toLocaleString('en-US', { weekday: 'short' });
}

export function formatAverageTemperature(temp: Temperature[]) {
  const average = temp.reduce((acc, curr) => acc + ((curr.Maximum.Value + curr.Minimum.Value) / 2), 0) / temp.length;
  return `${average.toFixed(1)}°${temp[0].Maximum.Unit}`
}

export function formatTemperature(temp: Temperature) {
  return `${((temp.Maximum.Value + temp.Minimum.Value) / 2).toFixed(1)}°${temp.Maximum.Unit}`
}

const weatherTextMap = {
  1: 'Sunny',
  2: 'Mostly Sunny',
  3: 'Partly Sunny',
  4: 'Intermittent Clouds',
  5: 'Hazy Sunshine',
  6: 'Mostly Cloudy',
  7: 'Cloudy',
  8: 'Dreary (Overcast)',
  11: 'Fog',
  12: 'Showers',
  13: 'Mostly Cloudy w/ Showers',
  14: 'Partly Sunny w/ Showers',
  15: 'T-Storms',
  16: 'Mostly Cloudy w/ T-Storms',
  17: 'Partly Sunny w/ T-Storms',
  18: 'Rain',
  19: 'Flurries',
  20: 'Mostly Cloudy w/ Flurries',
  21: 'Partly Sunny w/ Flurries',
  22: 'Snow',
  23: 'Mostly Cloudy w/ Snow',
  24: 'Ice',
  25: 'Sleet',
  26: 'Freezing Rain',
  29: 'Rain and Snow',
  30: 'Hot',
  31: 'Cold',
  32: 'Windy',
  33: 'Clear',
  34: 'Mostly Clear',
  35: 'Partly Cloudy',
  36: 'Intermittent Clouds',
  37: 'Hazy Moonlight',
  38: 'Mostly Cloudy',
  39: 'Partly Cloudy w/ Showers',
  40: 'Mostly Cloudy w/ Showers',
  41: 'Partly Cloudy w/ T-Storms',
  42: 'Mostly Cloudy w/ T-Storms',
  43: 'Mostly Cloudy w/ Flurries',
  44: 'Mostly Cloudy w/ Snow',
}

export function weatherText(iconNumber: number) {
  type weatherTextMapKey = keyof typeof weatherTextMap;

  return weatherTextMap[iconNumber as weatherTextMapKey] ?? null;
}