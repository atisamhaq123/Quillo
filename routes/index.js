var express = require('express');
const indexController = require ('../controllers/indexController')
const authMiddleware = require("../middleware/auth");
var router = express.Router();

router.get('/', authMiddleware, indexController.indexPage);

module.exports = router;
