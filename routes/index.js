var express = require('express');
var router = express.Router();
var school = require('../controller/schoolcontroller');
var staff = require('../controller/staffcontroller');
var student = require('../controller/studentcontroller')

router.post('/',school.school_register);
router.get('/',school.get_data);
router.get('/delete/:id',school.school_delete);
router.post('/update/:id',school.school_update);
router.post('/login',school.login);
router.get('/login',school.login_data);
router.get('/logout',school.logout);
router.post('/staff',school.addstaff);
router.get('/staff',school.viewstaff);


router.get('/staff/delete/:id',school.staff_delete);
router.post('/staff/update/:id',school.staff_update);
router.post('/staff/login',staff.staff_login);
router.get('/staff/login',staff.view_login_data);
router.get('/staff/logout',staff.staff_logout);
router.post('/student',staff.add_student);
router.get('/student',staff.view_student);


router.post('/student/login',student.student_login);
router.get('/student/login',student.view_student_login_data);
router.get('/student/logout',student.student_logout);

module.exports = router;