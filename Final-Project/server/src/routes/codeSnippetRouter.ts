import { Router } from 'express';
import * as CodeSnippetCtrl from '../controllers/codeSnippetController';
import { authenticateJWT } from '../authenticateJWT';

const codeSnippetRouter: Router = Router();

codeSnippetRouter.get('/', CodeSnippetCtrl.findAllCodeSnippets);
codeSnippetRouter.get('/:searchText', CodeSnippetCtrl.findCodeSnippetsByText);
codeSnippetRouter.post('/', authenticateJWT, CodeSnippetCtrl.createCodeSnippet);
codeSnippetRouter.put('/upvote/:id', authenticateJWT, CodeSnippetCtrl.upvoteCodeSnippet);
codeSnippetRouter.put('/downvote/:id', authenticateJWT, CodeSnippetCtrl.downVoteCodeSnippet);
codeSnippetRouter.put('/comment/:id', authenticateJWT, CodeSnippetCtrl.commentCodeSnippet);
codeSnippetRouter.put('/:id', authenticateJWT, CodeSnippetCtrl.updateCodeSnippet);

export default codeSnippetRouter;
