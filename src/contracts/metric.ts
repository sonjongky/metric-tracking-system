export enum DistanceUnit {
  METER = 'METER',
  CENTIMETER = 'CENTIMETER',
  INCH = 'INCH',
  FEET = 'FEET',
  YARD = 'YARD',
}

export enum TemperatureUnit {
  C = 'C',
  F = 'F',
  K = 'K',
  N = 'N',
}

export enum Unit {
  METER = 'METER',
  CENTIMETER = 'CENTIMETER',
  INCH = 'INCH',
  FEET = 'FEET',
  YARD = 'YARD',
  C = 'C',
  F = 'F',
  K = 'K',
}

export enum Type {
  DISTANCE = 'DISTANCE',
  TEMPERATURE = 'TEMPERATURE',
}

export type MetricDetails = {
  id: string;
  date: Date;
  value: number;
  unit: Unit;
  type: Type;
};

export type MetricFilters = {
  type?: Type;
  distanceUnit?: DistanceUnit;
  temperatureUnit?: TemperatureUnit;
  dayCountPeriod?: number;
};
