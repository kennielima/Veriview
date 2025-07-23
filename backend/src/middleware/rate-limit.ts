import { Request, Response } from 'express'
import { rateLimit } from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 5,
    message: { message: 'Too many requests, please try again after 10 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    keyGenerator: (req, res): any => {
        return req.ip;
    },
})
export const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: { message: 'Too many requests, please try again after 15 minutes.' },
    keyGenerator: (req, res): any => {
        return req.user ? (`${req.ip}:${req.user.id}`) : req.ip;
    },
    standardHeaders: true,
    legacyHeaders: false,
})