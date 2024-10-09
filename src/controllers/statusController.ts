import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prisma';
import { AppError } from '../utils/errorHandler';
import { StatusResponse } from '../types';

type ProductWithUrls = {
    outputImageUrls: string[];
};

export const getStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { requestId } = req.params;

        const processingRequest = await prisma.processingRequest.findUnique({
            where: { id: requestId },
        });

        if (!processingRequest) {
            throw new AppError('Processing request not found', 404);
        }

        const response: StatusResponse = {
            requestId: processingRequest.id,
            status: processingRequest.status,
            updatedAt: processingRequest.updatedAt,
        };

        if (processingRequest.status === 'COMPLETED') {
            const products = await prisma.product.findMany({
                where: { createdAt: { gte: processingRequest.createdAt } },
                select: { outputImageUrls: true },
            });

            response.processedImages = products.flatMap((product: ProductWithUrls) => product.outputImageUrls);
        }

        res.json(response);
    } catch (error) {
        next(error);
    }
};