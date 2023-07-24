const { connect, disconnect } = require('mongoose')
const uri = "#";

async function dbConnect() {
    await connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {

        console.info('DATABASE • Conectado com sucesso.')

    }).catch(err => { console.log(err.message) })
}

async function dbDisconnect() {
    await disconnect().then(() => {
        console.info('DATABASE • Conexão encerrada.')
    })
}

module.exports = { dbConnect, dbDisconnect }