import {
  DistanceUnit,
  MetricDetails,
  TemperatureUnit,
  Unit,
} from '../contracts/metric';

const METER_TO_CENTIMETER = 100;
const METER_TO_INCH = 0.0254;
const METER_TO_FEET = 0.3048;
const METER_TO_YARD = 0.9144;

const CENTIMETER_TO_METER = 1 / METER_TO_CENTIMETER;
const CENTIMETER_TO_INCH = 2.54;
const CENTIMETER_TO_FEET = 30.48;
const CENTIMETER_TO_YARD = 91.44;

const INCH_TO_METER = 1 / METER_TO_INCH;
const INCH_TO_CENTIMETER = 1 / CENTIMETER_TO_INCH;
const INCH_TO_FEET = 12;
const INCH_TO_YARD = 36;

const FEET_TO_METER = 1 / METER_TO_FEET;
const FEET_TO_CENTIMETER = 1 / CENTIMETER_TO_FEET;
const FEET_TO_INCH = 1 / INCH_TO_FEET;
const FEET_TO_YARD = 3;

const YARD_TO_METER = 1 / METER_TO_YARD;
const YARD_TO_CENTIMETER = 1 / CENTIMETER_TO_YARD;
const YARD_TO_INCH = 1 / INCH_TO_YARD;
const YARD_TO_FEET = 1 / FEET_TO_YARD;

export const convertToCorrespondingDistanceUnit = (
  metrics: MetricDetails[],
  distanceUnit: DistanceUnit,
): MetricDetails[] => {
  const convertedMetrics = metrics.map((metric) => {
    let convertedValue = metric.value;

    switch (distanceUnit) {
      case DistanceUnit.METER:
        switch (metric.unit) {
          case Unit.CENTIMETER:
            convertedValue *= CENTIMETER_TO_METER;
            break;
          case Unit.INCH:
            convertedValue *= INCH_TO_METER;
            break;
          case Unit.FEET:
            convertedValue *= FEET_TO_METER;
            break;
          case Unit.YARD:
            convertedValue *= YARD_TO_METER;
            break;
          default:
            break;
        }
        break;

      case DistanceUnit.CENTIMETER:
        switch (metric.unit) {
          case Unit.METER:
            convertedValue *= METER_TO_CENTIMETER;
            break;
          case Unit.INCH:
            convertedValue *= INCH_TO_CENTIMETER;
            break;
          case Unit.FEET:
            convertedValue *= FEET_TO_CENTIMETER;
            break;
          case Unit.YARD:
            convertedValue *= YARD_TO_CENTIMETER;
            break;
          default:
            break;
        }
        break;

      case DistanceUnit.INCH:
        switch (metric.unit) {
          case Unit.METER:
            convertedValue *= METER_TO_INCH;
            break;
          case Unit.CENTIMETER:
            convertedValue *= CENTIMETER_TO_INCH;
            break;
          case Unit.FEET:
            convertedValue *= FEET_TO_INCH;
            break;
          case Unit.YARD:
            convertedValue *= YARD_TO_INCH;
            break;
          default:
            break;
        }
        break;

      case DistanceUnit.FEET:
        switch (metric.unit) {
          case Unit.METER:
            convertedValue *= METER_TO_FEET;
            break;
          case Unit.CENTIMETER:
            convertedValue *= CENTIMETER_TO_FEET;
            break;
          case Unit.INCH:
            convertedValue *= INCH_TO_FEET;
            break;
          case Unit.YARD:
            convertedValue *= YARD_TO_FEET;
            break;
          default:
            break;
        }
        break;

      case DistanceUnit.YARD:
        switch (metric.unit) {
          case Unit.METER:
            convertedValue *= METER_TO_YARD;
            break;
          case Unit.CENTIMETER:
            convertedValue *= CENTIMETER_TO_YARD;
            break;
          case Unit.INCH:
            convertedValue *= INCH_TO_YARD;
            break;
          case Unit.FEET:
            convertedValue *= FEET_TO_YARD;
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    return {
      ...metric,
      unit: distanceUnit,
      value: convertedValue,
    };
  });

  return convertedMetrics as unknown as MetricDetails[];
};

export const convertToCorrespondingTemperatureUnit = (
  metrics: MetricDetails[],
  temperatureUnit: TemperatureUnit,
): MetricDetails[] => {
  const convertedMetrics = metrics.map((metric) => {
    let convertedValue = metric.value;

    switch (temperatureUnit) {
      case TemperatureUnit.C:
        switch (metric.unit) {
          case Unit.F:
            convertedValue = (metric.value - 32) * (5 / 9);
            break;
          case Unit.K:
            convertedValue = metric.value - 273.15;
            break;

          default:
            break;
        }
        break;

      case TemperatureUnit.F:
        switch (metric.unit) {
          case Unit.C:
            convertedValue = metric.value * (9 / 5) + 32;
            break;
          case Unit.K:
            convertedValue = (metric.value - 273.15) * (9 / 5) + 32;
            break;
          default:
            break;
        }
        break;

      case TemperatureUnit.K:
        switch (metric.unit) {
          case Unit.C:
            convertedValue = metric.value + 273.15;
            break;
          case Unit.F:
            convertedValue = (metric.value - 32) * (5 / 9) + 273.15;
            break;
          default:
            break;
        }
        break;

      default:
        break;
    }

    return {
      ...metric,
      value: convertedValue,
      unit: temperatureUnit,
    };
  });

  return convertedMetrics as unknown as MetricDetails[];
};
