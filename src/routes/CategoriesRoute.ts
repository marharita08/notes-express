import express, { Request, Response } from 'express';
import CategoriesService from "../services/CategoriesService";
import validateEmptyRequestBody from "../middleware/ValidateEmptyRequestBody";
import asyncHandler from "../middleware/AsyncHandler";
import HttpStatusCodes from "../constants/HttpStatusCodes";
const CategoriesRoute = express.Router();

CategoriesRoute.get('/', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
        const categories = await CategoriesService.getAll();
        res.status(HttpStatusCodes.OK).json(categories);
}))

export default CategoriesRoute;
