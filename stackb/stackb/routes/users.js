var express = require('express');
var router = express.Router();
const userController = require('../controllers/users');

/* GET users listing. */
router.get('/', userController.index);
router.get('/add', userController.add);
router.get('/delete', userController.delete);
router.get('/edit', userController.edit);

module.exports = router;