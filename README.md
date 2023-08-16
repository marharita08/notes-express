# Notes

This repository holds back-end of the Note App. It's front-end available by [link](https://github.com/marharita08/notes-react).

The Notes App is an application that allows users to manage their notes effectively. Users can add, edit, and delete notes. Additionally, notes can be archived and unarchived for better organization.

## Technologies Used

- TypeScript
- Express
- Docker
- PosgreSQL

## Prerequisites

Before running the application, ensure you have the following prerequisites installed on your system:

- Node.js
- Docker

## Installation

1. Clone project from repository `git clone https://github.com/marharita08/notes-express`.
2. Navigate to project folder `cd notes-express`.
3. Install the necessary npm packages `npm install`.
4. Build the application `npm run build`.
5. Update `.env` if it is necessary.
6. Run the application `docker-compose up`.
7. Install and run [front-end](https://github.com/marharita08/notes-react).

## Usage

The API receives data in the request body in JSON format.

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
