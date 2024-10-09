export interface CSVRow {
    serialNumber: string;
    productName: string;
    inputImageUrls: string;
}

export interface ProcessedProduct {
    serialNumber: number;
    productName: string;
    inputImageUrls: string[];
    outputImageUrls: string[];
}

export interface StatusResponse {
    requestId: string;
    status: string;
    updatedAt: Date;
    processedImages?: string[];
}