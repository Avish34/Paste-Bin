const mongoose = require('mongoose')
var connectionURL = process.env.MONGO_URL
mongoose.connect(connectionURL, { useNewUrlParser: true, useCreateIndex: true })
