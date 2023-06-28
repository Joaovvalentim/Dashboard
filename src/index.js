import express from 'express';
import dashboardRouter from 'controllers/DashboardController.js'


const app = express();
const port = 3001
app.use('/dashboard', dashboardRouter);
app.get('/', (req, res)=>{
    return res.send('Bem vindo a API')
})


app.listen(port, () => console.log(`listening on port ${port}`));
