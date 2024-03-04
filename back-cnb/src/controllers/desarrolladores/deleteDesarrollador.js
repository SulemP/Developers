//los controllers me sirven para crear servicios (peticiones)

const {Desarrolladores} = require("../../db") //aquí importo la tabla

const deleteDesarrolladores = async (req, res) => {
    const {id} = req.params
    console.log(id)
	try {
		const desarrollador = await Desarrolladores.findByPk(id)
        if(!desarrollador){
            return res.status(404).json({error: "Desarrollador no encontrado"})
        }
        await desarrollador.destroy();
        return res.status(200).json({ message: 'Desarrollador eliminado exitosamente.' });
	} catch (error) {
		res.status(500).send({ msg: "Error al eliminar desarrollador", error });
	}
};

module.exports = deleteDesarrolladores;