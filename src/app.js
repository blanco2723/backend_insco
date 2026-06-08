const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const verificarToken = require('./middlewares/authMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Insco!')
})

app.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: "Acceso a ruta protegida concedido.", usuario: req.usuario });
})

module.exports = app;