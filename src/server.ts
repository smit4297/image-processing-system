import app from './app';
import { config } from './config/config';

const startServer = () => {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
};

startServer();