import { celebrate, Joi, Segments } from 'celebrate';

const categories = ['sale', 'service', 'job', 'other'];

export const listAnnouncementsValidator = celebrate({
    [Segments.QUERY]: Joi.object({
        search: Joi.string().allow('').optional(),
        sort: Joi.string().valid('newest', 'oldest').optional(),
        page: Joi.number().integer().min(1).optional()
    })
});

export const idValidator = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().integer().positive().required()
    })
});

export const createAnnouncementValidator = celebrate({
    [Segments.BODY]: Joi.object({
        title: Joi.string().min(5).max(100).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().positive().required(),
        category: Joi.string().valid(...categories).required(),
        contactInfo: Joi.string().min(5).required()
    })
});

export const updateAnnouncementValidator = celebrate({
    [Segments.PARAMS]: Joi.object({
        id: Joi.number().integer().positive().required()
    }),
    [Segments.BODY]: Joi.object({
        title: Joi.string().min(5).max(100),
        description: Joi.string().min(10),
        price: Joi.number().positive(),
        category: Joi.string().valid(...categories),
        contactInfo: Joi.string().min(5)
    }).min(1)
});