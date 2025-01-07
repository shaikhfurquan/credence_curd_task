# Movie API Documentation

This section provides details about the Movie APIs for the Movie Booking application. Below are the available endpoints for movie management.

## API Description

The Movie API allows users to manage movie records through a set of RESTful endpoints. Users can add, retrieve, update, and delete movies. The API is built using Node.js, Express, and MongoDB, and it utilizes Redis for caching to enhance performance.

## Logging and Redis Caching Features

### Logging
The API uses a logging mechanism to track important events and errors. The logger captures:
- Successful operations (e.g., movie added, updated, deleted)
- Errors encountered during operations (e.g., database errors, invalid input)

Example log entries:
- **Info Log:** `Movie added successfully: End Game`
- **Error Log:** `Error while adding the movie: <error_message>`

### Redis Caching
To improve performance, the API utilizes Redis for caching movie data. The caching mechanism works as follows:
- When a movie is added, updated, or deleted, the cache for all movies is cleared to ensure that the latest data is fetched from the database.
- When retrieving all movies, the API first checks the Redis cache. If the data is found in the cache, it is returned immediately, reducing the load on the database.

## Available APIs
- [1. Add Movie](#1-add-movie)
- [2. Get All Movies](#2-get-all-movies)
- [3. Update Movie](#3-update-movie)
- [4. Delete Movie](#4-delete-movie)

---

### 1. Add Movie
- **Endpoint:** `POST http://localhost:5000/api/v1/movie/add`
- **Request Body:**
    ```json
    {
        "name": "End Game",
        "img": "End Game.png",
        "summary": "new movie"
    }
    ```
- **Response:**
    ```json
    {
        "success": true,
        "response": {
            "name": "End Game",
            "img": "End Game.png",
            "summary": "new movie",
            "_id": "unique_movie_id",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5000/api/v1/movie/add' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "name": "End Game",
        "img": "End_Game.png",
        "summary": "new movie"
    }'
    ```

### 2. Get All Movies
- **Endpoint:** `GET http://localhost:5000/api/v1/movie/get-all`
- **Response:**
    ```json
    {
        "success": true,
        "count": <number_of_movies>,
        "response": [
            {
                "name": "End Game",
                "img": "End Game.png",
                "summary": "new movie",
                "_id": "unique_movie_id",
                "createdAt": "timestamp",
                "updatedAt": "timestamp"
            },
            ...
        ]
    }
    ```
- **CURL Example:**
    ```bash
    curl --location 'http://localhost:5000/api/v1/movie/get-all'
    ```

### 3. Update Movie
- **Endpoint:** `PUT http://localhost:5000/api/v1/movie/update/{movieId}`
- **Request Body:**
    ```json
    {
        "name": "Updated Movie Title",
        "img": "Updated Image URL",
        "summary": "Updated Movie Summary"
    }
    ```
- **Response:**
    ```json
    {
        "success": true,
        "response": {
            "name": "Updated Movie Title",
            "img": "Updated Image URL",
            "summary": "Updated Movie Summary",
            "_id": "unique_movie_id",
            "createdAt": "timestamp",
            "updatedAt": "timestamp"
        }
    }
    ```
- **CURL Example:**
    ```bash
    curl --location --request PUT 'http://localhost:5000/api/v1/movie/update/667eef3d3773e207cf4baec8' \
    --header 'Content-Type: application/json' \
    --data '{
        "name": "Updated Movie Title",
        "img": "Updated Image URL",
        "summary": "Updated Movie Summary"
    }'
    ```

### 4. Delete Movie
- **Endpoint:** `DELETE http://localhost:5000/api/v1/movie/delete/{movieId}`
- **Response:**
    ```json
    {
        "success": true,
        "response": "Movie deleted successfully"
    }
   