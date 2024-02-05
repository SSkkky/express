const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' })
const fs = require('fs');
const cors = require('cors');
const bucket = require('./router/bucket.js');
const push = require('./router/push.js');
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', bucket)
app.use('/push', push)

const PORT = 3333;
app.listen(PORT, () => {
    console.log(`Server running... port :${PORT}`)
})
