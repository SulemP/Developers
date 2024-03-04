//los controllers me sirven para crear servicios (peticiones)

const {Desarrolladores} = require("../../db") //aquí importo la tabla

const getDesarrolladores = async (req, res) => {
	try {
		const desarrolladores = await Desarrolladores.findAll({
		});
		res.status(200).send(desarrolladores);
	} catch (error) {
		res.status(500).send({ msg: "Error al cargar los desarrolladores", error });
	}
};

module.exports = getDesarrolladores;