const productController = require("../controller/productController"); 

const router = require("express").Router();

router.post("/",productController.addProduct);
router.get("/",productController.getAllProducts);


router.get("/:id",productController.getSingleProduct);
router.put("/:id",productController.updateProduct);
router.delete("/:id",productController.deleteProduct);

module.exports=router;
