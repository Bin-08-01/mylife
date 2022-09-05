const userController = require("../controllers/userController");
const middelwareController = require("../controllers/middlewareController");
const router = require("express").Router();

router.get("/", middelwareController.verifyToken, userController.getAllUser);
router.delete("/:id", middelwareController.verifyTokenAndAdminAuth, userController.deleteUser);

module.exports = router;

