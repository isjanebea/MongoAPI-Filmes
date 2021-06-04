const router = require('express').Router();
const controllers = require('../controllers/filmes');
router.get('/', controllers.getAll);
router.post('/', controllers.bodyData, controllers.createLivro);
router.delete('/delete', controllers.deleteByTitle);
router.delete('/:id', controllers.deleteById);
router.patch('/:id', controllers.bodyData, controllers.updateById);
router.get('/:id', controllers.getById);
module.exports = router;