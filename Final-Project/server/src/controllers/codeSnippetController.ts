import { Response } from 'express';
import CodeSnippet from '../models/CodeSnippet';
import { AuthenticatedRequest } from '../authenticateJWT';
import User from '../models/User';

async function createCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { title, content } = req.body;
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const newCodeSnippet = await CodeSnippet.create({
      title,
      content,
      author: req.userId,
    });

    res.status(201).json({ newCodeSnippet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function updateCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { title, content } = req.body;
  const { id } = req.params;

  try {
    const codeSnippet = await CodeSnippet.findOne({ _id: id });

    if (!codeSnippet) {
      return res.status(404).json({ message: 'Code snippet not found' });
    }

    // Check if the user is the author of the code snippet
    if (codeSnippet.author.toString() !== req.userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    codeSnippet.title = title;
    codeSnippet.content = content;

    await codeSnippet.save();

    res.json({ codeSnippet });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  createCodeSnippet,
  updateCodeSnippet
};
