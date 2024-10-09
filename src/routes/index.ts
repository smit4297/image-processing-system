import express from 'express';
import multer from 'multer';
import { uploadCSV } from '../controllers/uploadController';
import { getStatus } from '../controllers/statusController';
import { getImage } from '../controllers/imageController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('csv'), uploadCSV);
router.get('/status/:requestId', getStatus);
router.get('/images/:imageId', getImage);

export default router;