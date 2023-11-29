import { Router } from 'express';
// import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
// import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { PostController } from '@/controllers/posts.controller';

export class PostRoute implements Routes {
  public path = '/posts';
  public router = Router();
  public post = new PostController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.post.createPost);
  }
}
