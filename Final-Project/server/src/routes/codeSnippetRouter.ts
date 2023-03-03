import { Router } from 'express';
import * as CodeSnippetCtrl from '../controllers/codeSnippetController';
import { authenticateJWT } from '../authenticateJWT';

const codeSnippetRouter: Router = Router();

codeSnippetRouter.post('/', authenticateJWT, CodeSnippetCtrl.createCodeSnippet);
codeSnippetRouter.put('/:id', authenticateJWT, CodeSnippetCtrl.updateCodeSnippet);

export default codeSnippetRouter;
