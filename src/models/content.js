const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const shortid=require('shortid')

const userContentSchema= new mongoose.Schema({
    Url : {
        type: String,
        unique: true,
        default: shortid.generate(),
        require: true
    } ,
    info : {
        type: String,
        require : true
    },
    userid : {
        type: mongoose.Types.ObjectId,
    }   
})

const Content= mongoose.model('Content',userContentSchema)

module.exports=Content;