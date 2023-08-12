import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import {checkUnknownFields} from "./CheckUnknownFields";

const validateArchiveRequest = (req: Request, res: Response, next: NextFunction) => {
    const schema = yup.object({
        archived: yup.boolean().required()
    });

    checkUnknownFields(req.body, schema.fields);

    schema.validateSync(req.body);
    next();
};

export default validateArchiveRequest;
