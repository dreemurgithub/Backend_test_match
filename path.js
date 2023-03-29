const path = require('path')
const path_to_student_file = path.join(__dirname,'data','student_file','student.json')
const path_to_teacher = path.join(__dirname,'data','teacher','teacher.json')
const path_to_admin = path.join(__dirname,'data','teacher','admin.json')
const path_to_chess = path.join(__dirname,'data','chess','list.json')

module.exports = {path_to_student_file , path_to_teacher , path_to_admin ,path_to_chess}