# Asynchronous Workers Description

## Image Processing Worker

The image processing system uses an asynchronous worker to handle the processing of uploaded CSV files and the associated images. This worker is implemented using the Bull queue system and runs independently from the main API server.

### Workflow

1. When a CSV file is uploaded via the API, a new processing request is created and added to the queue.
2. The worker picks up the job from the queue and starts processing.
3. For each product in the CSV:
   - Downloads the input images
   - Compresses the images using the Sharp library
   - Saves the processed images to the database
   - Updates the product record with the new image URLs
4. Once all products are processed, the worker updates the processing request status to "COMPLETED".
5. If any error occurs during processing, the status is set to "FAILED".
6. After completion (success or failure), a webhook is sent to notify external systems.

### Key Components

- **Processing Queue**: Implemented using Bull, backed by Redis for job storage and management.
- **Image Processing Service**: Uses Sharp for image compression and manipulation.
- **Database Interaction**: Uses Prisma ORM for database operations.
- **Webhook Service**: Sends notifications to a configured webhook URL upon job completion.

### Error Handling

- If an error occurs during processing, it is logged, and the processing request status is updated to "FAILED".
- The worker will attempt to process all products in a job, even if some fail.

### Scalability

- The worker system can be scaled horizontally by running multiple instances of the worker process.
- The use of a Redis-backed queue ensures that jobs are distributed among available workers.