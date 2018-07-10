

import { Response, Request, NextFunction } from 'express';

export let index = async (req: Request, res: Response) => {
    return res.render('frontend/index', {
      layout: 'main',
      user: req.user
    });
};

export let login = async (req: Request, res: Response) => {
    if (req.method === 'POST') {
        return res.render('frontend/login', {
            layout: false,
            title: 'Demo Login',
            errMsg: 'Error'
        });
    } else {
        return res.render('frontend/login', {
            layout: false,
            title: 'Demo Login'
        });
    }
};