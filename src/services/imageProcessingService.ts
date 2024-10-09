import sharp from 'sharp';
import axios from 'axios';
import prisma from '../models/prisma';
import { ProcessedProduct } from '../types';

const downloadImage = async (url: string): Promise<Buffer> => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
};

const compressImage = async (imageBuffer: Buffer): Promise<Buffer> => {
    return sharp(imageBuffer)
        .jpeg({ quality: 50 })
        .toBuffer();
};

const saveImageToDb = async (imageBuffer: Buffer, productId: number): Promise<number> => {
    const image = await prisma.image.create({
        data: {
            data: imageBuffer,
            mimeType: 'image/jpeg',
            productId: productId,
        },
    });
    return image.id;
};

export const processImages = async (product: ProcessedProduct): Promise<ProcessedProduct> => {
    const dbProduct = await prisma.product.create({
        data: {
            serialNumber: product.serialNumber,
            name: product.productName,
            inputUrls: product.inputImageUrls,
            outputImageUrls: [],
        },
    });

    const outputImageUrls: string[] = [];

    for (const url of product.inputImageUrls) {
        const imageBuffer = await downloadImage(url);
        const compressedImage = await compressImage(imageBuffer);
        const imageId = await saveImageToDb(compressedImage, dbProduct.id);
        outputImageUrls.push(`/api/images/${imageId}`);
    }

    await prisma.product.update({
        where: { id: dbProduct.id },
        data: { outputImageUrls: outputImageUrls },
    });

    return { ...product, outputImageUrls };
};