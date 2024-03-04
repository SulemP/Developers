const {Router} = require("express");
const router = Router();

const getDesarrolladores = require("../controllers/desarrolladores/getDesarrolladores")
const createDesarrollador = require("../controllers/desarrolladores/createDesarrollador")
const deleteDesarrollador = require("../controllers/desarrolladores/deleteDesarrollador")
const updateDesarrollador = require("../controllers/desarrolladores/updateDesarrollador")

router.get("/getDesarrolladores", getDesarrolladores)
router.post("/createDesarrollador", createDesarrollador)
router.delete("/deleteDesarrollador/:id", deleteDesarrollador)
router.put("/updateDesarrollador/:id", updateDesarrollador)

module.exports = router;