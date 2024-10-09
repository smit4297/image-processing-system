import { Request, Response, NextFunction } from 'express';
import { validateAndParseCSV } from '../services/csvService';
import { processingQueue } from '../queues/processingQueue';
import prisma from '../models/prisma';
import { AppError } from '../utils/errorHandler';
import { ProcessedProduct } from '../types';

export const uploadCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            throw new AppError('No file uploaded', 400);
        }

        const csvData = await validateAndParseCSV(req.file.buffer);

        const products: ProcessedProduct[] = csvData.map((row) => ({
            serialNumber: parseInt(row.serialNumber, 10),
            productName: row.productName,
            inputImageUrls: row.inputImageUrls.split(',').map((url) => url.trim()),
            outputImageUrls: [],
        }));

        const processingRequest = await prisma.processingRequest.create({
            data: { status: 'PENDING' },
        });

        await processingQueue.add({
            requestId: processingRequest.id,
            products,
        });

        res.status(202).json({
            message: 'CSV uploaded successfully. Processing started.',
            requestId: processingRequest.id,
        });
    } catch (error) {
        next(error);
    }
};