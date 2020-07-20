import jwt from 'jsonwebtoken';
import Config from './configs';

class Auth {
  validate(req, res, next) {
    const token = req.headers['x-access-token'].split(' ')[1];

    if (token) {
      jwt.verify(token, Config.secret, (err, decoded) => {
        if (err) {
          return res.status(403).send('Token inválido');
        } else {
          next();
        }
      });
    } else {
      res.status(401).send('Não autorizado');
    }
  }
}

export default new Auth();
