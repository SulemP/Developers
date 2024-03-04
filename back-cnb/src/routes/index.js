const {Router} = require("express");
const router = Router();

const Desarrolladores = require("./desarrolladores.js")

router.use("/desarrolladores", Desarrolladores)

module.exports = router;