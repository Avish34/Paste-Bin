const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Content = require('../models/content')
const auth = require('../middleware/authenticate')

router.post('/content', async (req, res) => {
    //console.log(req.body)
    const content = new Content(req.body)
    try {
        await content.save()

        res.status(201).send(content)

        //res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.post('/user/content', auth, async (req, res) => {

    const userid = req.user._id
    const url = req.body.Url
    const info = req.body.info
    const content = new Content({ Url: url, info: info, userid: userid })
    try {
        await content.save()

        res.status(201).send(content)

        //res.status(201).send(user)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/user/showContent', auth, async (req, res) => {
    try {
        const userContent = await Content.find({ userid: req.user._id })
        console.log(userContent)
        res.status(200).send(userContent)
    }
    catch (e) {
        res.status(400).send(e)
    }
})
router.post('/user/Editcontent/:id', auth, async (req, res) => {
    try {
        const content = await Content.findOne({ userid: req.user._id, Url: req.params.id })
        content.info = req.body.info
        await content.save()
        res.status(201).send(content)
    }
    catch (e) {
        res.status(400).send(e)
    }
})

router.get('/show/:id', async (req, res) => {
    try {
        const content = await Content.findOne({ Url: String(req.params.id )})
        res.status(200).send(content.info)
    }
    catch (e) {
        res.status(404).send(e)
    }
})

module.exports = router