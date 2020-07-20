import StartUp from './startUp';

const localhostPort = '8535';

const port = process.env.PORT || localhostPort; //Em produção || Em desenvolvimento

StartUp.app.listen(port, () => {
  console.log(`Executando em: ${port}`);
});
