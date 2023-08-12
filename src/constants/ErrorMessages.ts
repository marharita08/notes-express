
const NOTE_NOT_FOUND_ERR = "Note not found";
const CATEGORY_NOT_FOUND_ERR = `Category not found`;
const UNKNOWN_FIELDS_ERR = (fields: string) => `Unknown fields in request: ${fields}`;
const NOT_EMPTY_BODY_ERR = "Request body should be empty";
const PATCH_FIELDS_ERR = "There should be only archived field or name, category and content together.";

export default {
    NOTE_NOT_FOUND_ERR,
    CATEGORY_NOT_FOUND_ERR,
    UNKNOWN_FIELDS_ERR,
    NOT_EMPTY_BODY_ERR,
    PATCH_FIELDS_ERR
} as const;
