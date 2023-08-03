import express, { Request, Response } from 'express';
import NotesService from "../services/NotesService";
const NotesRoute = express.Router();
import HttpStatusCodes from "../constants/HttpStatusCodes";
import asyncHandler from "../middleware/AsyncHandler";
import validatePatchRequest from "../middleware/ValidatePatchRequest";
import validatePostRequest from "../middleware/ValidatePostRequest";
import validateEmptyRequestBody from "../middleware/ValidateEmptyRequestBody";

NotesRoute.get('/', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
      const notes = await NotesService.getAll()
      res.status(HttpStatusCodes.OK).json(notes);
}));

NotesRoute.get('/stats', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
      const stats = await NotesService.getStats();
      res.status(HttpStatusCodes.OK).json(stats);
}));

NotesRoute.get('/:id', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
      const id = +req.params.id;
      const note = await NotesService.getOne(id)
      res.status(HttpStatusCodes.OK).json(note);
}));

NotesRoute.post('/', validatePostRequest,
    asyncHandler(async (req: Request, res: Response)=> {
      const {name, category, content} = req.body;
      await NotesService.addOne(name, category, content);
      res.status(HttpStatusCodes.CREATED).end();
}));

NotesRoute.patch('/:id', validatePatchRequest,
    asyncHandler(async (req: Request, res: Response)=> {
      const {name, category, content, archived} = req.body;
      const id = +req.params.id;
      if (archived !== undefined) {
        await NotesService.updateArchived(id, archived);
      } else {
        await NotesService.updateFields(id, name, category, content);
      }
      res.status(HttpStatusCodes.OK).end();
}));

NotesRoute.delete('/:id', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
      const id = +req.params.id;
      await NotesService.delete(id);
      res.status(HttpStatusCodes.OK).end();
}));

export default NotesRoute;
