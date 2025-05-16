import { rateLimit } from 'express-rate-limit'

export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: 'Too many requests, please try again later.',
})
export const postLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
    message: 'Too many requests, please try again later.',
})