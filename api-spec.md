# API Specification

## Endpoints

### 1. Upload CSV

- **URL:** `/api/upload`
- **Method:** POST
- **Content-Type:** multipart/form-data
- **Description:** Upload a CSV file containing product information for image processing.

#### Request Body
- `csv`: CSV file

#### Response
- Status Code: 202 (Accepted)
- Body:
  ```json
  {
    "message": "CSV uploaded successfully. Processing started.",
    "requestId": "string"
  }
  ```

### 2. Check Processing Status

- **URL:** `/api/status/:requestId`
- **Method:** GET
- **Description:** Check the status of a processing request.

#### Response
- Status Code: 200 (OK)
- Body:
  ```json
  {
    "requestId": "string",
    "status": "string",
    "updatedAt": "date",
    "processedImages": ["string"] // Only included if status is "COMPLETED"
  }
  ```

### 3. Get Processed Image

- **URL:** `/api/images/:imageId`
- **Method:** GET
- **Description:** Retrieve a processed image by its ID.

#### Response
- Status Code: 200 (OK)
- Content-Type: image/jpeg
- Body: Binary image data

## Error Responses

All endpoints may return the following error responses:

- Status Code: 400 (Bad Request)
  ```json
  {
    "error": "Error message describing the issue"
  }
  ```

- Status Code: 404 (Not Found)
  ```json
  {
    "error": "Resource not found"
  }
  ```

- Status Code: 500 (Internal Server Error)
  ```json
  {
    "error": "Internal server error"
  }
  ```