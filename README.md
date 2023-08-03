# notes-express

The notes-express is API that allows to manage notes.

## Technologies Used

- TypeScript
- Express

## Prerequisites

Before running the application, make sure you have the Node.js installed.

## Installation

1. Clone project from repository `git clone https://github.com/marharita08/notes-express`.
2. Navigate to project folder `cd notes-express`.
3. Install the necessary npm packages `npm install`.
4. Build the application `npm run build`.
5. Run the application `npm run start`.
6. Test API using Postman at `http://localhost:3000/`.

## Usage

1. POST /notes - create new note. Required request body fields:
   - name;
   - category (available categories: Task, Idea, Random Thought);
   - content.
2. DELETE /notes/:id - delete note by id. Request body should be empty.
3. PATCH /notes/:id - edit note. Required request body fields:
   - to update note:
     - name;
     - category (available categories: Task, Idea, Random Thought);
     - content;
   - to archive/unarchive note:
     - archived (true or false);
4. GET /notes/:id - retrieve note by id. Request body should be empty.
5. GET /notes - get all notes.  Request body should be empty.
6. GET /notes/stats - get aggregated data statistics.  Request body should be empty.
