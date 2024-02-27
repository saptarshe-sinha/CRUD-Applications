const { create, getAll, getOne, update, deleteUser } = require('../controller/userContoler')
const router = require('express').Router();

router.post("/create", create)
router.get("/getAll", getAll)
router.get("/getOne/:id",getOne)
router.put("/update/:id",update)
router.delete("/delete/:id",deleteUser)

module.exports = router