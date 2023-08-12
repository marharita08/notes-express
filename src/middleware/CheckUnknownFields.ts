import {ValidationError} from "yup";
import ErrorMessages from "../constants/ErrorMessages";

type Object = {
    [key: string]: any;
};

export const checkUnknownFields = (fields: Object, schema: Object) => {
    const unknownFields = Object.keys(fields).filter((field) => !(field in schema));
    if (unknownFields.length > 0) {
        throw new ValidationError(ErrorMessages.UNKNOWN_FIELDS_ERR(unknownFields.join(', ')));
    }
}
