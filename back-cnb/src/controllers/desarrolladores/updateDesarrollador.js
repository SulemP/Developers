const {Desarrolladores} = require("../../db") //aquí importo la tabla

const updateDesarrollador = async (req, res) => {
    const {id} = req.params
    const{name, age, skills} = req.body
    console.log(id)
	try {
		const desarrollador = await Desarrolladores.findByPk(id)
        if(!desarrollador){
            return res.status(404).json({error: "Desarrollador no encontrado"})
        }

        desarrollador.name = name
        desarrollador.age = age
        desarrollador.skills = skills

        await desarrollador.save();
        return res.status(200).json({ message: 'Desarrollador actualizado exitosamente.' });
	} catch (error) {
		res.status(500).send({ msg: "Error al actualizar el desarrollador", error });
	}
};

module.exports = updateDesarrollador;