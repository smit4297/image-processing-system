import { Request, Response, NextFunction } from 'express';
import prisma from '../models/prisma';
import { AppError } from '../utils/errorHandler';

export const getImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { imageId } = req.params;
        const image = await prisma.image.findUnique({
            where: { id: parseInt(imageId, 10) },
        });

        if (!image) {
            throw new AppError('Image not found', 404);
        }

        res.contentType(image.mimeType);
        res.send(image.data);
    } catch (error) {
        next(error);
    }
};