import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import {ValidationError} from "yup";
import ErrorMessages from "../constants/ErrorMessages";

const validatePatchRequest = (req: Request, res: Response, next: NextFunction) => {
    const schema = yup
        .object()
        .shape({
            archived: yup.boolean(),
            name: yup.string(),
            category: yup.string(),
            content: yup.string(),
        })
        .test(
            'fields',
            ErrorMessages.PATCH_FIELDS_ERR,
            (value) => {
                const archivedPresent = value.archived !== undefined;
                const fieldsPresent =
                    value.name !== undefined
                    && value.category !== undefined
                    && value.content !== undefined;

                return (archivedPresent && !fieldsPresent) || (!archivedPresent && fieldsPresent);
            }
        );

    const unknownFields = Object.keys(req.body).filter((field) => !(field in schema.fields));
    if (unknownFields.length > 0) {
        throw new ValidationError(ErrorMessages.UNKNOWN_FIELDS_ERR(unknownFields.join(', ')));
    }

    schema.validateSync(req.body);
    next();
};

export default validatePatchRequest;
