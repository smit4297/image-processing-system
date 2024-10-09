import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 3000,
    databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/image_processing',
    redisUrl: process.env.REDIS_URL || 'redis://localhost:6379',
    webhookUrl: process.env.WEBHOOK_URL || 'http://example.com/webhook',
};