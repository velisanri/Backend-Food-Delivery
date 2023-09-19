const cartController = require("../controller/cartController");

const router = require("express").Router();

router.post("/",  cartController.addCart);
router.get("/",cartController.getCart);
router.put("/",cartController.updateCart);
router.delete("/",cartController.deleteCart);
 
module.exports = router;
