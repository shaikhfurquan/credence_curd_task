# Movie API Documentation

This section provides details about the Movie APIs for the Movie Booking application. Below are the available endpoints for movie management.

## Available APIs
- [Movie APIs](#movie-apis)
  - [1. Add Movie](#1-add-movie)
  - [2. Get All Movies](#2-get-all-movies)
  - [3. Update Movie](#3-update-movie)
  - [4. Delete Movie](#4-delete-movie)

---


### 1. Add Movie
- **Endpoint:** `POST http://localhost:4000/api/v1/movie/add`
- **Request Body:**
    ```json
    {
        "title": "Movie Title",
        "description": "Movie Description",
        "releaseDate": "2024-12-26",
        "genre": "Action",
        "director": "Director Name",
        "cast": ["Actor 1", "Actor 2"],
        "rating": 8.5
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:4000/api/v1/movie/add' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "title": "Movie Title",
        "description": "Movie Description",
        "releaseDate": "2024-12-26",
        "genre": "Action",
        "director": "Director Name",
        "cast": ["Actor 1", "Actor 2"],
        "rating": 8.5
    }'
    ```

### 2. Get All Movies
- **Endpoint:** `GET http://localhost:4000/api/v1/movie/get-all`
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:4000/api/v1/movie/get-all'
    ```

### 3. Update Movie
- **Endpoint:** `PUT http://localhost:4000/api/v1/movie/update/{movieId}`
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:4000/api/v1/movie/update/667eef3d3773e207cf4baec8' \
    --header 'Content-Type: application/json' \
    --data '{
        "title": "Updated Movie Title",
        "description": "Updated Movie Description"
    }'
    ```

### 4. Delete Movie
- **Endpoint:** `DELETE http://localhost:4000/api/v1/movie/delete/{movieId}`
- **CURL Example:**
    ```bash
    curl --location --request DELETE 'http://localhost:4000/api/v1/movie/delete/667eef3d3773e207cf4baec8'
    ```