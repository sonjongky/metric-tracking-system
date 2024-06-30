import { Router } from "express";
import metric from './metric';


const router = Router();

router.use('/metric', metric);

export default router;
