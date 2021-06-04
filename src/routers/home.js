const router = require('express').Router();
const controllers = require('../controllers/home')


router.get("/", controllers.index)


module.exports = router;