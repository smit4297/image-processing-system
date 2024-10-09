# Image Processing System

This project is an image processing system that allows users to upload CSV files containing product information and associated image URLs. The system processes these images asynchronously, compressing them and storing them in a database.

## Documentation

- [API Specification](api-spec.md)
- [Asynchronous Workers Description](worker-desc.md)

## Features

- CSV file upload for bulk image processing
- Asynchronous image processing using workers
- Image compression and storage
- RESTful API for status checking and image retrieval
- Webhook notifications for processing completion

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Redis
- Bull (for job queuing)
- Prisma (ORM)
- Sharp (for image processing)
- Docker

## Dockerized Setup

The project is containerized using Docker, making it easy to set up and run in various environments.

### Prerequisites

- Docker
- Docker Compose

### Running the Application

1. Clone the repository:
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create a `.env` file in the project root and add the necessary environment variables:
   ```
   PORT=3000
   DATABASE_URL=postgresql://user:password@db:5432/imageprocessing
   REDIS_URL=redis://redis:6379
   WEBHOOK_URL=http://example.com/webhook
   ```

3. Build and start the containers:
   ```
   docker-compose up --build
   ```

The application should now be running and accessible at `http://localhost:3000`.

### Docker Compose Configuration

The `docker-compose.yml` file defines the following services:

- `app`: The main application container
- `db`: PostgreSQL database
- `redis`: Redis for job queuing

The configuration ensures that the services are properly linked and that data persistence is maintained through Docker volumes.

## Testing the APIs

To test the APIs, you can use the provided `image-processing-tester.html` file. This HTML file includes a user-friendly interface to interact with the Image Processing System APIs.

To use the tester:

1. Open the `image-processing-tester.html` file in a web browser.
2. Use the interface to:
   - Upload CSV files
   - Check processing status
   - View processed images

The tester provides an easy way to interact with the system and visualize the results of the image processing tasks.


## Development

For local development without Docker:

1. Install dependencies:
   ```
   npm install
   ```

2. Set up the database and Redis locally.

3. Update the `.env` file with local connection strings.

4. Run the development server:
   ```
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.