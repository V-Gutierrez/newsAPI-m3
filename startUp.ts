import express from 'express';
import * as bodyParser from 'body-parser';

import cors from 'cors';
import compression from 'compression';

import Db from './infra/db';
import NewsController from './controllers/newsController';

import uploads from './infra/uploads';

class StartUp {
  public app: express.Application;
  private readonly _db: Db;

  constructor() {
    this.app = express();
    this._db = new Db();
    this._db.createConnection();
    this.middleware();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: 'GET, OPTIONS, PUT, POST, DELETE',
      origin: '*', //opção de ambiente de desenvolvimento
    };

    this.app.use(cors(options));
  }

  middleware() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  routes() {
    this.app.route('/').get((req, res) => {
      res.send({
        versão:
          '0.0.1 - construído por Victor Gutierrez e idealizado por Tiago Adriano',
      });
    });

    this.app.route('/uploads').post(uploads.single('sentFile'), (req, res) => {
      try {
        res.send('Arquivo enviado com sucesso');
      } catch (error) {
        console.error(error);
      }
    });
    this.app.route('/api/v1/news').get(NewsController.get);
    this.app.route('/api/v1/news/:id').get(NewsController.getById);
    this.app.route('/api/v1/news').post(NewsController.create);
    this.app.route('/api/v1/news/:id').put(NewsController.update);
    this.app.route('/api/v1/news/:id').delete(NewsController.delete);
  }
}

export default new StartUp();
