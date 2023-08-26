import cors from 'cors';
import createDebug from 'debug';
import express from 'express';
import morgan from 'morgan';
import { taskRouter } from './router/task.router.js';
export const app = express(); // Llamamos a express.
const debug = createDebug('V25:App'); // El V25 puede ser el que sea.
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
// Middleware
app.use((req, res, next) => {
    debug('Soy un Middleware');
    next();
});
app.get('/', (req, res) => {
    debug('Hola Mundo');
    res.write('<h1>Holaaaaa Kubo</h1>');
    res.end();
});
app.use('/tasks', taskRouter); // Importamos el taskRouter de la caprtera router.
