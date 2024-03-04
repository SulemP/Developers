// Importa el modelo de Cuentas
const { Desarrolladores } = require('../../db');

// Controlador para crear una nueva cuenta
const createDesarrollador = async (req, res) => {
    try {
        // Extrae los datos de la cuenta del cuerpo de la solicitud
        const { name, age, skills } = req.body;

        // Crea una nueva cuenta en la base de datos
        const nuevoDesarrollador = await Desarrolladores.create({
            name,
            age,
            skills
        });

        // Devuelve la respuesta con la nueva cuenta creada
        res.status(201).json({ message: 'Desarrollador creado exitosamente', desarrollador: nuevoDesarrollador });
    } catch (error) {
        res.status(500).json({ msg: 'Error al crear desarrolladores', error });
    }
};

// Exporta el controlador
module.exports = createDesarrollador
