const Bank  = require ('../models/bank.js')

class bankController {
    async create(req, res) {
        try {
            const bank = new Bank({
                ...req.body
            })
            await bank.save()
            res.status(201).json(bank)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async get(req, res) {
        try {
            const banks = await Bank.find()
            return res.json(banks)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async update(req, res) {
        try {
            const bank = req.body
            if(!bank._id) {
                res.status(400).json({message: 'Id не вказано'})
            }
            const updateBank = await Bank.findByIdAndUpdate(bank._id, bank, {new: true})
            return res.json(updateBank)
        } catch (e) {
            res.status(500).json(e)
        }
    }
    async delete(req, res) {
        try {
            const {id} = req.params
            if(!id) {
                res.status(400).json({message: 'Id не вказано'})
            }
            const bank = await Bank.findByIdAndRemove(id)
            return res.json(bank)
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

module.exports = new bankController()