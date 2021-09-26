const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const Bank = require('./models/bank')
//const {v4}= require('uuid')
const app = express()

// let BANKS = [
//     { id: v4(), name: 'Приват', rate: 12, amount: 10000000, min: 25, term: 240 }
// ]

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//GET
app.get('/api/banks', async (req, res) => {
    const banks = await Bank.find({})
    res.status(200).json(banks)
})
//POST
app.post('/api/banks', async (req, res) => {
    // const bank = {...req.body, id: v4()}
    // BANKS.push(bank)
    // res.status(201).json(bank)
    const bank = new Bank({
        ...req.body
    })
    await bank.save()
    res.status(201).json(bank)
})
//DELETE
app.delete('/api/banks/:_id', async (req, res) => {
    // BANKS = BANKS.filter(b => b.id !== req.params.id)
    // res.status(200).json({message: `банк был удален, id-${req.params.id}`})
    const bank = await Bank.findByIdAndRemove(req.params._id)
    res.status(200).json({message: `банк был удален, id-${req.params._id}`})
})
//PUT
app.put('/api/banks/:id',async (req, res) => {
    // const idx = BANKS.findIndex(b => b.id === req.params.id)
    // BANKS[idx] = req.body
    // res.json(BANKS[idx])
    const bank = await Bank.findByIdAndUpdate(req.body._id, req.body)
    res.json(req.body)
})



app.use(express.static(path.resolve(__dirname, 'client')))

async function start() {
    try{
        await mongoose.connect(
            'mongodb+srv://Alex:1q2w3e4r@cluster0.ueb9r.mongodb.net/banks',
            {
                useNewUrlParser: true,
                // useFindAndModify: false
            }, () => { console.log('mongodb connected') })

        app.listen(3000, () => {
            console.log('Server started...')
        })
    } catch (e) {
        console.log(e);
    }
}
start()

