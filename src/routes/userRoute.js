const express= require("express")
const router = express.Router()
const userController= require("../controllers/userController")
const authorization= require("../middleware/authorization")

router.get("/me", authorization.verifyToken, userController.getDetailUser)

router.get("/all", authorization.verifyToken, userController.getAllUser)

router.put("/:id/update", authorization.verifyToken, authorization.userUpdateDeleteAuthorize)

router.delete("/:id/delete", userController.deleteUser)

module.exports=router;