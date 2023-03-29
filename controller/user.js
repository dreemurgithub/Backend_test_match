const route_user = require('express')()
const {path_to_teacher, path_to_admin, path_to_chess} = require('../path')
const fs = require('fs')
const {Chess_schema, User_schema, Admin_schema} = require('../data/schema')


route_user.post('/user/login', async (req, res) => {
        req.session.role = 'giaovien'
        req.session.uid = req.body.uid
        res.send({message:"Đăng nhập thành công"})
    }
)

route_user.get('/user/logout', (req, res) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.send('done')
})
route_user.post('/user/pause', async (req, res) => {
    const data_edit = await User_schema.findOne({id_firebase: req.body.id})
    data_edit.active = !data_edit.toObject().active
    await data_edit.save()
    const new_data = await User_schema.find()
    res.send(new_data)
    let a = 0

})
//TODO get the library
route_user.get('/user/chess/:id', async (req, res) => {
    const doc = await Chess_schema.findById(req.params.id)
    res.send(doc)
})

module.exports = route_user