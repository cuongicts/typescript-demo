import express, { NextFunction } from 'express';
const router = express.Router();

/**
 * Controllers (route handlers).
 */
import * as userController from '../controllers/user-controller';
import * as frontendController from '../controllers/frontend-controller';
import { check, validationResult } from 'express-validator/check';


// api router
router.post('/register', userController.register);
router.post('/api/login', [ 
  check('email').isEmail().withMessage('The params [email] is required'),
  check('password').exists().withMessage('The params [password] is required')
], (req :any, res :any, next: NextFunction) => {
  const errors = validationResult(req);
  try {
    validationResult(req).throw();
    next();
  } catch (error) {
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
router.post('/DeleteUser', userController.deleteUser);
router.post('/TestAPI', userController.apiTest);

// frontend api
router.get('/index', frontendController.index);
router.all('/login', frontendController.login);

export default router;