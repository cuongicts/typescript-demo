import express from 'express';
import { Response, Request, NextFunction } from 'express';
import { check, validationResult, oneOf } from 'express-validator/check';



export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    check('email').exists();
    check('password').exists();
    console.log('1--');
    try {
        validationResult(req).throw();
        next();
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            code: 422,
            status: 'error',
            data: {
                message: 'Bad request',
                error: error,
            }
        });
    }
};

export const validateLogin2 = [
    check('email').isEmail().withMessage('must be a valid email'),
    check('password').isLength({ min: 4 }).withMessage('passwd 4 chars long!'),
  ];