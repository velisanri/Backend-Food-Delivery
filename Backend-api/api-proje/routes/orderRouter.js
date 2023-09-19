const orderController = require("../controller/orderController");

const router = require("express").Router();

router.post("/",orderController.createOrder);
router.get("/",orderController.getOrder);



module.exports = router; 