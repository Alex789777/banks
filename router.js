const Router = require ('express')
const BankController  = require ('./bankController.js')

const router = new Router()

router.get('/banks', BankController.get)
router.post('/banks', BankController.create)
router.put('/banks', BankController.update)
router.delete('/banks/:id', BankController.delete)

module.exports = router