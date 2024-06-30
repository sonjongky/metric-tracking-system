import { Router } from 'express';
import { createMetric, findMetrics } from '../services/metricService';

const router = Router();

router.get('/', async (req, res) => {
  const users = await findMetrics(req.query);

  res.status(200).json(users);
});

router.post('/', async (req, res) => {
  const createdMetric = await createMetric(req.body);

  res.status(201).json(createdMetric);
});
export default router;
