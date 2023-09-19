const adressController = require("../controller/adressController");

const router = require("express").Router();

router.post("/",adressController.addAdress);
router.get("/",adressController.getAdress);


router.put("/:id",adressController.updateAdress);
router.delete("/:id",adressController.deleteAdress);


module.exports = router;