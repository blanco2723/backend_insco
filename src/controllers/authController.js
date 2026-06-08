const supabase = require('../config/supabase');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
    try{
        const { nombre,email, password, rol } = req.body
        const passwordHash = await bcrypt.hash(password, 10)

        const { data, error } = await supabase
            .from('usuarios')
            .insert([{ nombre, email, password: passwordHash, rol }])
            .select()
        if (error) {
            return res.status(400).json( error )
        }
        res.status(201).json(data)
    }
    catch(error){
        res.status(500).json({ mensaje: "Error interno del servidor", 
            error: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const { data, error } = await supabase
            .from('usuarios')
            .select('*')
            .eq('email', email)
            .single()
        if (error || !data) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" })
        }
        const passwordValido = await bcrypt.compare(password, data.password)
        if (!passwordValido) {
            return res.status(401).json({ mensaje: "Contraseña incorrecta" })
        }

        const token = jwt.sign({ id: data.id, email: data.email, rol: data.rol }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.json({ usuario: data.nombre,
            rol: data.rol,
            token })

    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message })
    }
}

module.exports = {
    crearUsuario,
    login
}