import express, { NextFunction } from 'express';
import cors from 'cors';
const router = express.Router();

router.use(cors());

import * as chatAppController from '../controllers/aws-websocket-client';

router.get('/', (req, res) => res.send('Hello World!'));
router.get('/index', chatAppController.index);

export default router;