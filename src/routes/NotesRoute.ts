import express, { Request, Response } from 'express';
import NotesService from "../services/NotesService";
const NotesRoute = express.Router();
import HttpStatusCodes from "../constants/HttpStatusCodes";
import asyncHandler from "../middleware/AsyncHandler";
import validateUpdateRequest from "../middleware/ValidateUpdateRequest";
import validatePostRequest from "../middleware/ValidatePostRequest";
import validateEmptyRequestBody from "../middleware/ValidateEmptyRequestBody";
import validateArchiveRequest from "../middleware/ValidateArchiveRequest";

NotesRoute.get('/', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
      const notes = await NotesService.getAll();
      res.status(HttpStatusCodes.OK).json(notes);
}));

NotesRoute.get('/active', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
        const notes = await NotesService.getActive();
        res.status(HttpStatusCodes.OK).json(notes);
}));

NotesRoute.get('/archived', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
        const notes = await NotesService.getArchived();
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
      const id = await NotesService.addOne(req.body);
      res.status(HttpStatusCodes.CREATED).json({ id });
}));

NotesRoute.patch('/:id', validateUpdateRequest,
    asyncHandler(async (req: Request, res: Response)=> {
      const id = +req.params.id;
      await NotesService.update(id, req.body);
      res.status(HttpStatusCodes.OK).end();
}));

NotesRoute.patch('/archive/:id', validateArchiveRequest,
    asyncHandler(async (req: Request, res: Response)=> {
          const id = +req.params.id;
          const { archived } = req.body;
          await NotesService.updateArchived(id, archived);
          res.status(HttpStatusCodes.OK).end();
}));

NotesRoute.delete('/:id', validateEmptyRequestBody,
    asyncHandler(async (req: Request, res: Response)=> {
      const id = +req.params.id;
      await NotesService.delete(id);
      res.status(HttpStatusCodes.OK).end();
}));

export default NotesRoute;
