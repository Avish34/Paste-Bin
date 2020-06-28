const express=require('express')
const app=express()
require('./db/mongoose')
const UserRoute=require('./routes/user')
const ContentRoute=require('./routes/content')
app.use(express.json())
app.use(UserRoute)
app.use(ContentRoute)
const port=process.env.PORT
app.listen(port,()=>{
    console.log('Server Started')
})