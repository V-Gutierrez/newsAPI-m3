import mongoose from 'mongoose';

class Db {
  private readonly DB_URL = 'mongodb://link-db/db_portal';

  createConnection() {
    mongoose.connect(this.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default Db;
