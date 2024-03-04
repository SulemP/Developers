const app = require("./src/app"); //aquí const me sirve para importar
const { conn } = require("./src/db"); //conn es conexión

conn.sync({ force: false }).then(() => {
	app.listen(3001, async () => { //inicia mi servicio en el puerto 3001, ya que mi front esta en el 3000
		console.log("server listening on port 3001");
	});
});