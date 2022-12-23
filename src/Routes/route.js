const express = require("express")
const router = express.Router()
const userController = require("../Controllers/userController")
const vendorController = require('../Controllers/vendorController')
const productController = require('../Controllers/productController')

const middleware = require("../middleware/auth")

router.post("/signUp",userController.signUp)

router.post("/signIn",userController.signIn)

router.post("/vendor/:userId",middleware.authenticaiton,vendorController.addVendor)

router.post("/product/:vendorId",middleware.authenticaiton,productController.addProduct)

router.put("/product/:productId",middleware.authenticaiton,productController.updateProduct)

router.get("/product",middleware.authenticaiton,productController.getProduct)

router.delete("/product/:productId",middleware.authenticaiton,productController.deleteProduct)


module.exports = router