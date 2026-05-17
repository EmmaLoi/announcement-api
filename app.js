import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { errors } from 'celebrate';
import announcementsRouter from './src/routes/announcements.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Announcement API',
            version: '1.0.0',
        },
    },
    apis: ['./src/routes/*.js'],
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/announcements', announcementsRouter);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
    });
});

app.use(errors());

app.use((err, req, res, next) => {
    if (err.code === 'P2025') {
        return res.status(404).json({
            message: 'Announcement not found',
        });
    }

    res.status(500).json({
        message: 'Server error',
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});