import csv from 'csv-parser';
import { Readable } from 'stream';
import { CSVRow } from '../types';
import { AppError } from '../utils/errorHandler';

export const validateAndParseCSV = (fileBuffer: Buffer): Promise<CSVRow[]> => {
    return new Promise((resolve, reject) => {
        const results: CSVRow[] = [];
        Readable.from(fileBuffer)
            .pipe(csv({
                mapHeaders: ({ header }) => header.trim(),
                mapValues: ({ header, value }) => value.trim()
            }))
            .on('data', (data: any) => {
                if (!data['Serial Number'] || !data['Product Name'] || !data['Input Image Urls']) {
                    reject(new AppError('Invalid CSV format: Missing required columns', 400));
                }
                results.push({
                    serialNumber: data['Serial Number'],
                    productName: data['Product Name'],
                    inputImageUrls: data['Input Image Urls']
                });
            })
            .on('end', () => {
                if (results.length === 0) {
                    reject(new AppError('Invalid CSV format: No data rows found', 400));
                }
                resolve(results);
            })
            .on('error', (error) => {
                reject(new AppError(`Error parsing CSV: ${error.message}`, 400));
            });
    });
};
