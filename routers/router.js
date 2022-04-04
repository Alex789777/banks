const Router = require ('express')
const bankController  = require ('../controllers/bankController.js')

const router = new Router()

router.get('/banks', bankController.get)
router.post('/banks', bankController.create)
router.put('/banks', bankController.update)
router.delete('/banks/:id', bankController.delete)

module.exports = router