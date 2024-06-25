const storage = require('node-persist');
storage.init();
var student = require('../model/studentmodel');

exports.student_login = async (req, res) => {
    var data = await student.find({ "email": req.body.email });
    var std_id = await storage.getItem('std_id');
    
    if (std_id == undefined) {
            if (data.length == 1) {
                    if (data[0].password == req.body.password) {
                        await storage.setItem('std_id', data[0].id)
                        res.status(200).json({
                            status: "login student success",
                            data
                        })
                    } else {
                        res.status(200).json({
                            status: "check password of student"
                        })
                    }
            } else {
                res.status(200).json({
                    status: "password incorrect of student"
                })
            }
    } else {
        res.status(200).json({
            status: "already student login"
        })
    }
}
// staff logout
exports.student_logout = async (req, res) => {
    await storage.removeItem('std_id');
    res.status(200).json({
        status: "student logout"
    })
}
 
// je user  login thyo a jova
exports.view_student_login_data = async (req, res) => {
    var std_id = await storage.getItem('std_id');
    var data = await student.findById(std_id).populate("stlo_id");
    // console.log('user',user);
    res.status(200).json({
        status: "watch student login detail",
        data
    })
}