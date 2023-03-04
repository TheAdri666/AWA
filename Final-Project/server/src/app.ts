import express, { Express } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRouter';
import codeSnippetRouter from './routes/codeSnippetRouter';
import cors from 'cors';
import path from 'path';

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRouter);
app.use('/api/codeSnippet', codeSnippetRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req, res) => res.sendFile(path.resolve("..", "client", "build", "index.html"))); 
} else if (process.env.NODE_ENV === "development") { 
  const corsOptions = { 
    origin: "http://localhost:3000", 
    optionsSuccessStatus: 200,  
  };
  app.use(cors(corsOptions));
}

export default app;
