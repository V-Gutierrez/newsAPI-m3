import NewsService from '../services/newsService';
import * as HttpStatus from 'http-status';
import redis from 'redis';
import Helper from '../infra/helper';

class NewsController {
  get(req, res) {
    const client = redis.createClient(6379, 'redis13');

    client.get('news', (error, reply) => {
      if (reply) {
        Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
      } else {
        NewsService.get()
          .then((news) => {
            client.set('news', JSON.stringify(news));
            client.expire('news', 600);
            Helper.sendResponse(res, HttpStatus.OK, news);
          })
          .catch((err) => console.error.bind(console, `Error ${err}`));
      }
    });
  }

  getById(req, res) {
    const _id = req.params.id;
    NewsService.getById(_id)
      .then((news) => Helper.sendResponse(res, HttpStatus.OK, news))
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  create(req, res) {
    const vm = req.body;

    NewsService.create(vm)
      .then(() =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          'Notícia cadastrada com sucesso'
        )
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  update(req, res) {
    const _id = req.params.id;
    const newContent = req.body;

    NewsService.update(_id, newContent)
      .then(() =>
        Helper.sendResponse(
          res,
          HttpStatus.OK,
          'Notícia atualizada com sucesso'
        )
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  delete(req, res) {
    const _id = req.params.id;

    NewsService.delete(_id)
      .then(() =>
        Helper.sendResponse(res, HttpStatus.OK, 'Notícia excluída com sucesso')
      )
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }
}

export default new NewsController();
