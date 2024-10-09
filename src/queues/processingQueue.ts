import Queue from 'bull';
import { config } from '../config/config';
import { processImages } from '../services/imageProcessingService';
import { sendWebhook } from '../services/webhookService';
import prisma from '../models/prisma';
import { ProcessedProduct } from '../types';

const processingQueue = new Queue('image-processing', config.redisUrl);

processingQueue.process(async (job) => {
    const { requestId, products } = job.data;

    try {
        await prisma.processingRequest.update({
            where: { id: requestId },
            data: { status: 'PROCESSING' },
        });

        for (const product of products) {
            const processedProduct = await processImages(product);
        }

        await prisma.processingRequest.update({
            where: { id: requestId },
            data: { status: 'COMPLETED' },
        });

        await sendWebhook(`Processing completed for request ${requestId}`);

    } catch (error) {
        console.error('Error processing images:', error);
        await prisma.processingRequest.update({
            where: { id: requestId },
            data: { status: 'FAILED' },
        });
    }
});

export { processingQueue };