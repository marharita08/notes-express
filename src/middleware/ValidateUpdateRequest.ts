import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import {checkUnknownFields} from "./CheckUnknownFields";

const validateUpdateRequest = (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object({
        name: yup.string(),
        category_id: yup.string(),
        content: yup.string(),
    });

    checkUnknownFields(req.body, schema.fields);

    schema.validateSync(req.body);
    next();
};

export default validateUpdateRequest;
