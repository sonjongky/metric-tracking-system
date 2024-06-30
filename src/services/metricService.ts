import Joi from 'joi';
import {
  DistanceUnit,
  MetricDetails,
  MetricFilters,
  TemperatureUnit,
  Type,
  Unit,
} from '../contracts/metric';
import { prisma } from '../utils/database';
import {
  convertToCorrespondingTemperatureUnit,
  convertToCorrespondingDistanceUnit,
} from '../utils/metric';

export type CreateMetricData = {
  value: number;
  unit: Unit;
  date: Date;
  type: Type;
};
export const createMetric = async (
  data: CreateMetricData,
): Promise<MetricDetails> => {
  const validatedData = await Joi.object<CreateMetricData>({
    value: Joi.number().when('type', {
      is: Type.DISTANCE,
      then: Joi.number().min(0).required(),
      otherwise: Joi.number().required(),
    }),
    unit: Joi.string().when('type', {
      is: Type.DISTANCE,
      then: Joi.string()
        .valid(...Object.values(DistanceUnit))
        .required(),
      otherwise: Joi.string()
        .valid(...Object.values(TemperatureUnit))
        .required(),
    }),
    type: Joi.string().valid(...Object.values(Type)),
    date: Joi.date().required(),
  }).validateAsync(data);

  try {
    const createdMetric = await prisma.metric.create({
      data: {
        ...validatedData,
      },
    });

    return {
      ...createdMetric,
    } as MetricDetails;
  } catch (error) {
    throw error;
  }
};

export type UserFilters = {
  companyId?: string | null;
};

export const findMetrics = async (
  filters: MetricFilters,
): Promise<MetricDetails[]> => {
  try {
    const schema = Joi.object<MetricFilters>({
      type: Joi.string().valid(Type.DISTANCE, Type.TEMPERATURE),
      distanceUnit: Joi.when('type', {
        is: Type.DISTANCE,
        then: Joi.string().valid(...Object.values(DistanceUnit)),
        otherwise: Joi.forbidden(),
      }),
      temperatureUnit: Joi.when('type', {
        is: Type.TEMPERATURE,
        then: Joi.string().valid(...Object.values(TemperatureUnit)),
        otherwise: Joi.forbidden(),
      }),
      dayCountPeriod: Joi.number().integer().positive().optional(),
    });

    const validatedData = await schema.validateAsync(filters);

    const { type, distanceUnit, temperatureUnit, dayCountPeriod } =
      validatedData;

    let whereFilters: {
      type: Type;
      date?: {
        lte: Date;
        gte: Date;
      };
    } = {
      type: type as Type,
    };
    if (dayCountPeriod) {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - dayCountPeriod);

      whereFilters.date = {
        lte: currentDate,
        gte: startDate,
      };
    }

    let metrics = (await prisma.metric.findMany({
      where: {
        ...whereFilters,
        deletedAt: null,
      },
      select: {
        id: true,
        date: true,
        value: true,
        unit: true,
        type: true,
      },
    })) as MetricDetails[];

    if (distanceUnit) {
      metrics = convertToCorrespondingDistanceUnit(
        metrics,
        distanceUnit as DistanceUnit,
      );
    } else if (temperatureUnit) {
      metrics = convertToCorrespondingTemperatureUnit(
        metrics,
        temperatureUnit as TemperatureUnit,
      );
    }

    return metrics;
  } catch (error) {
    throw error;
  }
};
