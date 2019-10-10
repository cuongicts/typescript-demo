import express, { NextFunction } from 'express';
import cors from 'cors';
import * as Sentry from '@sentry/node';
const router = express.Router();
// options for cors midddleware
// const options: cors.CorsOptions = {
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
//   credentials: true,
//   methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
//   preflightContinue: false
// };

router.use(cors());

/**
 * Controllers (route handlers).
 */
import * as userController from '../controllers/user-controller';
import * as frontendController from '../controllers/frontend-controller';
import { check, validationResult } from 'express-validator/check';

// api router
router.get('/', (req, res) => res.send('Hello World!'));
router.post('/register', userController.register);
router.post('/api/login', [
  check('email').isEmail().withMessage('The params [email] is required'),
  check('password').exists().withMessage('The params [password] is required')
], (req: any, res: any, next: NextFunction) => {
  const errors = validationResult(req);
  try {
    validationResult(req).throw();
    next();
  } catch (error) {
    Sentry.captureException(error);
    return res.status(400).json({
      code: 400,
      status: 'error',
      data: {
        message: 'Bad request',
        error: errors.array(),
      }
    });
  }
}, userController.login);
router.get('/GetAllUsers', userController.getAllUsers);
router.post('/update-all-user', userController.updateAllUsers);
router.post('/DeleteUser', userController.deleteUser);
router.post('/upload', userController.upload);

// frontend api
router.get('/index', frontendController.index);
router.all('/login', frontendController.login);

export default router;