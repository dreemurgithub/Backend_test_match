// const Database = require("@replit/database")
// const student = new Database()
const fs = require('fs')
const router_student = require('express')()
const {path_to_student_file} = require('../../path')

router_student.put('/write_json', (req, res) => {
    //TODO route này để lưu học sinh + edit all, xóa /edit_change

    fs.writeFile(path_to_student_file, JSON.stringify(req.body), 'utf-8', (err) => {
        if (err) throw err;
        res.send({ha: 'wut'})

    })
})

router_student.put('/write_json/excel', (req, res) => {
    //TODO route edit excel

    fs.writeFile(path_to_student_file, JSON.stringify(req.body), 'utf-8', (err) => {
        if (err) throw err;
        res.send({ha: 'wut'})

    })
})

router_student.put('/write_json/edit', async (req, res) => {


    const id = req.body.id //ID này là text
    //lấy ID, rồi edit toàn bộ all_object.id và lưu lại
    fs.readFile(path_to_student_file, (err, data) => {
        const old_data = JSON.parse(data)
        old_data[id] = req.body
        fs.writeFile(path_to_student_file, JSON.stringify(old_data), err => {
            if (err) throw err
        })
        res.send(req.body)

    })
})

router_student.get('/write_json', (req, res) => {

    fs.readFile(path_to_student_file,(err,data)=>{
      if (err) throw err;
      const obj = JSON.parse(data)
      res.send(obj)
    })

});


router_student.get('/write_json/:id', async (req, res) => {
    //TODO edit, delete luôn ở đây
    const id = req.params.id
    fs.readFile(path_to_student_file, (err, data) => {
        if (err) throw err;
        res.send(JSON.parse(data)[id])
    })
});



module.exports = router_student