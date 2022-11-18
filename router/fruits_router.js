const fruitsController = require("../controller/fruits_controller");
const Express = require("express")
const router = Express.Router();

router.post("/add", fruitsController.add);
router.get("/find", fruitsController.findall);


module.exports = router