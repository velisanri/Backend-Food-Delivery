const paymentController = require("../controller/paymentController");

const router = require("express").Router();

router.post("/",paymentController.addPayment);

module.exports = router;