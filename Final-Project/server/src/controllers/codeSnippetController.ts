import { Request, Response } from 'express';
import CodeSnippet from '../models/CodeSnippet';
import { AuthenticatedRequest } from '../authenticateJWT';
import User from '../models/User';

async function findAllCodeSnippets(req: Request, res: Response) {
  try {
    const codeSnippets = await CodeSnippet.find();
    return res.status(200).json(codeSnippets);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
}

async function findCodeSnippetsByText(req: Request, res: Response) {
  const { searchText } = req.params;
  try {
    const results = await CodeSnippet.find({
      $or: [
        { title: { $regex: searchText, $options: 'i' } },
        { content: { $regex: searchText, $options: 'i' } },
      ],
    });

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
}

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
}

async function upvoteCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const codeSnippet = await CodeSnippet.findById(id);
    if (!codeSnippet) {
      return res.status(404).json({ message: 'Code snippet not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (codeSnippet.upvotes.includes(user._id)) {
      codeSnippet.upvotes = codeSnippet.upvotes.filter(user => user._id.toString() !== userId)
    } else {
      codeSnippet.upvotes.push(user._id);
      codeSnippet.downvotes = codeSnippet.downvotes.filter(user => user._id.toString() !== userId)
    }
    await codeSnippet.save();
    res.json(codeSnippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function downVoteCodeSnippet(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    const codeSnippet = await CodeSnippet.findById(id);
    if (!codeSnippet) {
      return res.status(404).json({ message: 'Code snippet not found' });
    }
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (codeSnippet.downvotes.includes(user._id)) {
      codeSnippet.downvotes = codeSnippet.downvotes.filter(user => user._id.toString() !== userId)
    } else {
      codeSnippet.downvotes.push(user._id);
      codeSnippet.upvotes = codeSnippet.upvotes.filter(user => user._id.toString() !== userId)
    }
    await codeSnippet.save();
    res.json(codeSnippet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function commentCodeSnippet (req: AuthenticatedRequest, res: Response) {
  try {
    const { comment } = req.body;
    const { id } = req.params;
    const { userId } = req;

    const user = await User.findById(userId);

    const codeSnippet = await CodeSnippet.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    if (!codeSnippet) {
      throw new Error('Code snippet not found');
    }

    const newComment = {
      author: user._id,
      content: comment,
    };

    codeSnippet.comments.push(newComment);

    // Save the updated code snippet to the database
    await codeSnippet.save();

    res.status(200).json({ message: 'Comment added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export {
  findAllCodeSnippets,
  findCodeSnippetsByText,
  createCodeSnippet,
  updateCodeSnippet,
  upvoteCodeSnippet,
  downVoteCodeSnippet,
  commentCodeSnippet
};
