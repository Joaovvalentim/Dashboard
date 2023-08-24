// Importa o módulo Express para criar um servidor
import express from 'express';

// Importa o roteador definido em DashboardController.js
import dashboardRouter from 'controllers/DashboardController.js';

// Importa o middleware de resposta personalizada
import { response } from 'middlewares/response';

// Cria uma instância do servidor Express
const app = express();

// Define a porta em que o servidor irá escutar
const port = 3001;

// Adiciona o middleware de resposta personalizada a todas as rotas
app.use(response);

// Usa o roteador de DashboardController nas rotas /dashboard
app.use('/dashboard', dashboardRouter);

// Rota para a página inicial que exibe uma mensagem de boas-vindas
app.get('/', (req, res) => {
    return res.send('Bem vindo à API');
});

// Inicia o servidor e começa a ouvir na porta especificada
app.listen(port, () => console.log(`listening on port ${port}`));
