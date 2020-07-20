import NewsRepository from '../repositories/newsRepository';

class NewsService {
  async get() {
    return NewsRepository.find({});
  }

  async getById(_id) {
    return NewsRepository.findById(_id);
  }

  async create(news) {
    return NewsRepository.create(news);
  }
  async update(_id, news) {
    return NewsRepository.findByIdAndUpdate(_id, news);
  }

  async delete(_id) {
    return NewsRepository.findByIdAndRemove(_id);
  }
}

export default new NewsService();
