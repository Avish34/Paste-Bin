const mongoose=require('mongoose')
var connectionURL='mongodb://127.0.0.1:27017/paste-bin'
mongoose.connect(connectionURL,{ useNewUrlParser: true,useCreateIndex:true})