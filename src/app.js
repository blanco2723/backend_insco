const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const verificarToken = require('./middlewares/authMiddleware');
const saberRoutes = require('./routes/saberRoutes');
const carreraRoutes = require('./routes/carreraRoutes');   
const asignaturaRoutes = require('./routes/asignaturaRoutes'); 
const competenciaRoutes = require('./routes/competenciaRoutes');
const contenidoRoutes = require('./routes/contenidoRoutes');
const articulacionRoutes = require('./routes/articulacionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const evidenciaRoutes = require('./routes/evidenciaRoutes');
const storageRoutes = require('./routes/storageRoutes');
const proyectodesarrolloRoutes = require('./routes/ProyectoDesarrolloRoutes');
const iaRoutes = require('./routes/iaRoutes')

const app = express();

app.use(cors());
app.use(express.json());

app.use('/saberes', saberRoutes);
app.use('/carreras', carreraRoutes);
app.use('/asignaturas', asignaturaRoutes);
app.use('/competencias', competenciaRoutes);
app.use('/contenidos', contenidoRoutes);
app.use('/articulaciones', articulacionRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/proyectos', proyectoRoutes);
app.use('/evidencias', evidenciaRoutes);
app.use('/storage', storageRoutes);
app.use('/proyecto-desarrollo', proyectodesarrolloRoutes);
app.use('/ia',iaRoutes)
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de Insco!')
})

app.get('/perfil', verificarToken, (req, res) => {
    res.json({ mensaje: "Acceso a ruta protegida concedido.", usuario: req.usuario });
})

module.exports = app;