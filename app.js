const express = require ('express')
const path = require ('path')
const mongoose = require ('mongoose')
const router = require ('./routers/router.js')

const app = express()

const PORT = process.env.PORT || 80

app.use(express.static(path.resolve(__dirname, 'client')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', router)

async function start() {
    try{
        await mongoose.connect(
            'mongodb+srv://Alex:1q2w3e4r@cluster0.ueb9r.mongodb.net/banks',
            {
                useNewUrlParser: true,
                // useFindAndModify: false
            }, () => { console.log('mongodb connected') })

        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT} ...`)
        })
    } catch (e) {
        console.log(e);
    }
}

start()

