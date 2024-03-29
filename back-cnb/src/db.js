//este archivo me sirve para crear la conexión con mi base de datos

const { Sequelize } = require("sequelize"); //todo lo que tenga require es una importación
const fs = require("fs");
const path = require("path");

//contraseñas para ingresar a mi DB
const DB_USER = "postgres";
const DB_PASSWORD = "password";
const DB_HOST = "localhost"; // o la dirección IP de tu servidor de PostgreSQL
const DB_NAME = "cnb"; // Asegúrate de reemplazar esto con el nombre real de tu base de datos
const DB_PORT = "5432"; // Este es el puerto predeterminado para PostgreSQL

const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		logging: false,
		native: false,
	}
);

const basename = path.basename(__filename);
const modelDefiners = [];
//se leen todos los archivos de la carpeta Models, y se agregan al arreglo ModelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
	.filter(
		(file) =>
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
	)
	.forEach((file) => {
		modelDefiners.push(require(path.join(__dirname, "/models", file)));
	});
//se inyecta conexion de sequelize a todos los modelos
modelDefiners.forEach((model) => model(sequelize));

//se capitalizam los nombres de todos los modelos
let entries = Object.entries(sequelize.models);
let capEntries = entries.map((entry) => [
	entry[0][0].toUpperCase() + entry[0].slice(1),
	entry[1],
]);

sequelize.models = Object.fromEntries(capEntries);

module.exports = {
	...sequelize.models,
	conn: sequelize,
};