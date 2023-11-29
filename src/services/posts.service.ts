import { Service } from 'typedi';
import { HttpException } from '@exceptions/httpException';
import { Post } from '@interfaces/posts.interface';
import { PostModel } from '@models/posts.model';

@Service()
export class PostService {
  public async createPost(userData: Post): Promise<Post> {
    const findPost: Post = await PostModel.findOne({ title: userData.title });
    if (findPost) throw new HttpException(409, `This email ${userData.title} already exists`);

    const createPostData: Post = await PostModel.create({ ...userData });

    return createPostData;
  }
}
