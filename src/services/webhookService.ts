import axios from 'axios';
import { config } from '../config/config';

export const sendWebhook = async (message: string): Promise<void> => {
    try {
        await axios.post(config.webhookUrl, { message });
    } catch (error) {
        console.error('Error sending webhook:', error);
    }
};