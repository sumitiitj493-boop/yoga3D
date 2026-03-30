const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/database');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';
const requiredEnvVars = isProduction ? ['MONGO_URI', 'JWT_SECRET'] : [];
const missingEnvVars = requiredEnvVars.filter((name) => !process.env[name]);

if (missingEnvVars.length > 0) {
    console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    process.exit(1);
}

connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.CORS_ORIGIN || process.env.APP_URL || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
}));
app.use(express.static(path.join(__dirname, '../yoga-asana-3d')));

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Yoga 3D App API',
            version: '2.0.0',
            description: 'Complete API for Yoga Pose Management with Authentication & Progress Tracking',
        },
        servers: [
            {
                url: process.env.APP_URL || 'http://localhost:5000',
                description: isProduction ? 'Production server' : 'Development server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        status: 'ok',
        environment: process.env.NODE_ENV || 'development'
    });
});

// Mount routes
app.use('/api/asanas', require('./routes/asanaRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));

// Serve frontend for all other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../yoga-asana-3d', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    const appUrl = process.env.APP_URL || `http://localhost:${PORT}`;
    console.log(`🚀 Server: ${appUrl}`);
    console.log(`📚 API Docs: ${appUrl}/api-docs`);
    console.log(`🧘 3D Viewer: ${appUrl}`);
    console.log(`📊 Features: Auth, Progress Tracking, 3D Visualization`);
});
