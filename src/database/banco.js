const mongoose = require('mongoose')

const connect = async () => {
    let conectado = await mongoose.connect(process.env.DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    try {
        console.log('banco conectado! ')
    } catch (error) {
        console.log({ mensagem : error})
    }
}

module.exports = { connect };