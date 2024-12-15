
## Movie APIs

This section provides details about the Movie APIs for the Movie Booking application. Below are the available endpoints for movie management.

### 1. Add Movie API
- **Endpoint:** `POST /api/v1/movie/add`
- **Request Body:**
    ```json
    {
        "name": "Movie Name",
        "img": "Image URL",
        "summary": "Movie summary"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'localhost:4000/api/v1/movie/add' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Movie Name",
        "img": "Image URL",
        "summary": "Movie summary"
    }'
    ```

### 2. Get All Movies API
- **Endpoint:** `GET /api/v1/movie/get-all`
- **CURL Example:**
    ```bash
    curl --location 'localhost:4000/api/v1/movie/get-all'
    ```

### 3. Update Movie API
- **Endpoint:** `PUT /api/v1/movie/update/{movieId}`
- **Request Body:**
    ```json
    {
        "name": "Updated Movie Name",
        "img": "Updated Image URL",
        "summary": "Updated movie summary"
    }
    ```
- **CURL Example:**
    ```bash
    curl --location --request PUT 'localhost:4000/api/v1/movie/update/667eef3d3773e207cf4baec8' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "Updated Movie Name",
        "img": "Updated Image URL",
        "summary": "Updated movie summary"
    }'
    ```

### 4. Delete Movie API
- **Endpoint:** `DELETE /api/v1/movie/delete/{movieId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'localhost:4000/api/v1/movie/delete/667eef3d3773e207cf4baec8'
    ```

## Notes
- Replace `{movieId}` with the actual ID of the movie you want to update or delete.
- Ensure that the server is running on `localhost:4000` or adjust the URL accordingly if hosted elsewhere.

Feel free to reach out for any questions or further clarifications regarding the API usage!