# Book Inventory App

A small Express and PostgreSQL REST API for managing books, genres, and authors.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- `pg`
- `dotenv`
- EJS

## Setup

Install dependencies:

```bash
npm install
```

Create a `.env` file with your local PostgreSQL connection details:

```env
DB_HOST=localhost
DB_USER=your_postgres_user
DB_NAME=your_database_name
DB_PORT=5432
```

If your local Postgres user requires a password, add:

```env
DB_PASSWORD=your_password
```

You can also use a connection string instead:

```env
DATABASE_URL=postgres://your_postgres_user@localhost:5432/your_database_name
```

Start the dev server:

```bash
npm run dev
```

By default, the app runs at:

```text
http://localhost:3000
```

## API Overview

All request bodies should be sent as JSON with this header:

```text
Content-Type: application/json
```

## Books

### Get All Books

```http
GET /books
```

Returns an array of books:

```json
[
	{
		"title": "Dune",
		"genre": "Science Fiction"
	}
]
```

### Get One Book

```http
GET /books/:id
```

Example:

```http
GET /books/1
```

Returns:

```json
{
	"title": "Dune",
	"genre": "Science Fiction"
}
```

### Create a Book

```http
POST /books
```

Required fields:

- `title`
- `genreName`

Optional fields:

- `authorName`

Body:

```json
{
	"title": "Dune",
	"genreName": "Science Fiction",
	"authorName": "Frank Herbert"
}
```

If the genre or author does not exist yet, the app creates it before linking it to the book.

Success response:

```json
{
	"message": "Successfully created book"
}
```

### Update a Book

```http
PUT /books/:id
```

Required fields:

- `title`
- `genreName`

Body:

```json
{
	"title": "Dune Messiah",
	"genreName": "Science Fiction"
}
```

If the genre does not exist yet, the app creates it before updating the book.

Success response:

```json
{
	"message": "Successfully updated book"
}
```

### Delete a Book

```http
DELETE /books/:id
```

Example:

```http
DELETE /books/1
```

Success response:

```json
{
	"message": "Successfully deleted book"
}
```

## Genres

### Get All Genres

```http
GET /genres
```

Returns an array of genre names:

```json
[
	"Science Fiction",
	"Fantasy"
]
```

### Get One Genre

```http
GET /genres/:id
```

Example:

```http
GET /genres/1
```

Returns:

```json
"Science Fiction"
```

### Create a Genre

```http
POST /genres
```

Required fields:

- `genreName`

Body:

```json
{
	"genreName": "Science Fiction"
}
```

Success response:

```json
{
	"message": "Successfully created genre"
}
```

### Update a Genre

```http
PUT /genres/:id
```

Required fields:

- `genreName`

Body:

```json
{
	"genreName": "Speculative Fiction"
}
```

Success response:

```json
{
	"message": "Successfully updated genre"
}
```

### Delete a Genre

```http
DELETE /genres/:id
```

Example:

```http
DELETE /genres/1
```

Success response:

```json
{
	"message": "Successfully deleted genre"
}
```

## Authors

### Get All Authors

```http
GET /authors
```

Returns an array of author names:

```json
[
	"Frank Herbert",
	"Ursula K. Le Guin"
]
```

### Get One Author

```http
GET /authors/:id
```

Example:

```http
GET /authors/1
```

Returns:

```json
"Frank Herbert"
```

### Create an Author

```http
POST /authors
```

Required fields:

- `authorName`

Body:

```json
{
	"authorName": "Frank Herbert"
}
```

Success response:

```json
{
	"message": "Successfully created author"
}
```

### Update an Author

```http
PUT /authors/:id
```

Required fields:

- `authorName`

Body:

```json
{
	"authorName": "Franklin Herbert"
}
```

Success response:

```json
{
	"message": "Successfully updated author"
}
```

### Delete an Author

```http
DELETE /authors/:id
```

Example:

```http
DELETE /authors/1
```

Success response:

```json
{
	"message": "Successfully deleted author"
}
```

## Example Requests

Create a genre:

Method: `POST`

URL: `http://localhost:3000/genres`

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
	"genreName": "Science Fiction"
}
```

Create an author:

Method: `POST`

URL: `http://localhost:3000/authors`

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
	"authorName": "Frank Herbert"
}
```

Create a book with a genre and author:

Method: `POST`

URL: `http://localhost:3000/books`

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
	"title": "Dune",
	"genreName": "Science Fiction",
	"authorName": "Frank Herbert"
}
```

Update a book:

Method: `PUT`

URL: `http://localhost:3000/books/1`

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
	"title": "Dune Messiah",
	"genreName": "Science Fiction"
}
```

Delete a book:

Method: `DELETE`

URL: `http://localhost:3000/books/1`

Body: none
