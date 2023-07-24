const { dbConnect } = require('./database.js')

setTimeout(async () => {
    await dbConnect()
})

const express = require('express')
const { updateInfo } = require('./functions/get/updateInfo.js')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/listagem', async (req, res) => {
    await updateInfo().then(r => res.send(r))
})

app.listen(port, () => {
    console.log(`Conexão express iniciada na porta ${port}`)
})
