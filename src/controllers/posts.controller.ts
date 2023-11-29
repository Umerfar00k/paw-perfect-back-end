import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Post } from '@interfaces/posts.interface';
import { PostService } from '@services/posts.service';

export class PostController {
  public post = Container.get(PostService);

  public createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: Post = req.body;
      const createPostData: Post = await this.post.createPost(userData);

      res.status(201).json({ data: createPostData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };
}
