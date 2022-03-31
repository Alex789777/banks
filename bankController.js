const Bank  = require ('./models/bank.js')

class BankController {
    async create(req, res) {
        try {
            const bank = new Bank({
                ...req.body
            })
            await bank.save()
            res/*.status(201)*/.json(bank)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async get(req, res) {
        try {
            const banks = await Bank.find({})
            res.status(200).json(banks)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const bank = await Bank.findByIdAndUpdate(req.body._id, req.body, {new: true})
            return res.json(bank)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async delete(req, res) {
        try {
            const bank = await Bank.findByIdAndRemove(req.params.id)
            res.status(200).json({message: `банк был удален, id-${req.params.id}`})
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new BankController()