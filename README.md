# notes-express

The notes-express is API that allows to manage notes.

## Technologies Used

- TypeScript
- Express
- Docker
- PosgreSQL

## Prerequisites

Before running the application, make sure you have the Node.js installed.

## Installation

1. Clone project from repository `git clone https://github.com/marharita08/notes-express`.
2. Navigate to project folder `cd notes-express`.
3. Install the necessary npm packages `npm install`.
4. Build the application `npm run build`.
5. Update `.env` if it is necessary.
6. Run the application `docker-compose up`.
7. Test API using Postman at `http://localhost:3001/` (use port specified in your `.env` as `APP_HOST_PORT` by default it is `3001`).

## Usage

1. POST /notes - create new note. Required request body fields:
   - name;
   - category_id (available categories: Task (id:1), Idea (id:2), Random Thought(id:3));
   - content.
2. DELETE /notes/:id - delete note by id. Request body should be empty.
3. PATCH /notes/:id - update note. Required request body fields:
   - name;
   - category_id (available categories: Task (id:1), Idea (id:2), Random Thought(id:3));
   - content;
4. PATCH /notes/archive/:id - archive/unarchive note. Required request body fields:
   - archived (true or false);
5. GET /notes/:id - retrieve note by id. Request body should be empty.
6. GET /notes - get all notes.  Request body should be empty.
7. GET /notes/stats - get aggregated data statistics. Request body should be empty.
8. GET /notes/active - get active (not archived) notes. Request body should be empty.
9. GET /notes/archived - get archived notes. Request body should be empty.
10. GET /categories - get all categories. Request body should be empty.
