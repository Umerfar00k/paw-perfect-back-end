import 'reflect-metadata';
import fs from 'fs';
import path from 'path';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { NODE_ENV, PORT, HOST, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
import { dbConnection } from '@database';
import { Routes } from '@interfaces/routes.interface';
import { ErrorMiddleware } from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';

export class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public host: string;

  constructor(routes: Routes[]) {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.host = HOST || '127.0.0.1';

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeSwagger();
    this.initializeErrorHandling();
  }

  public listen() {
    this.app.listen(this.port, () => {
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`Server is started at http://${this.host}:${this.port}`);
      logger.info(`REST API docs is available at http://${this.host}:${this.port}/api/docs`);
      logger.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private async connectToDatabase() {
    await dbConnection();
  }

  private initializeMiddlewares() {
    this.app.use(morgan(LOG_FORMAT, { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  private initializeSwagger() {
    const options = {
      swaggerDefinition: {
        info: {
          title: 'REST API',
          version: '3.0.0',
          description: 'API docs',
        },
      },
      // apis: ['users.yaml'],
      apis: this.getSwaggerFilePaths(__dirname + '/docs'),
    };

    const specs = swaggerJSDoc(options);
    this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
  }

  public getSwaggerFilePaths(directory: any) {
    const swaggerFiles = fs.readdirSync(directory).filter(file => {
      return path.extname(file) === '.yaml';
    });
    return swaggerFiles.map(file => path.join(directory, file));
  }

  private initializeErrorHandling() {
    this.app.use(ErrorMiddleware);
  }
}
