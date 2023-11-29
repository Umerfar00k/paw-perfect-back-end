import { App } from '@/app';
import { AuthRoute } from '@routes/auth.route';
import { UserRoute } from '@routes/users.route';
import { ValidateEnv } from '@utils/validateEnv';
import { PostRoute } from './routes/posts.route';
import { ProductRoute } from './routes/products.route';
import { CategoryRoute } from './routes/categories.route';
import { BrandRoute } from './routes/brands.route';
import { OrderRoute } from './routes/orders.route';

ValidateEnv();

const app = new App([new UserRoute(), new AuthRoute(), new PostRoute(), new ProductRoute(), new CategoryRoute(), new BrandRoute(), new OrderRoute()]);

app.listen();
