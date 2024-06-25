const storage = require('node-persist');
storage.init();
var staff = require('../model/staffmodel');
var student = require('../model/studentmodel')

exports.staff_login = async (req, res) => {
    var data = await staff.find({ "email": req.body.email });
    var stlo_id = await storage.getItem('stlo_id');
    
    if (stlo_id == undefined) {
            if (data.length == 1) {
                    if (data[0].password == req.body.password) {
                        await storage.setItem('stlo_id', data[0].id)
                        res.status(200).json({
                            status: "login staff success",
                            data
                        })
                    } else {
                        res.status(200).json({
                            status: "check password of staff"
                        })
                    }
            } else {
                res.status(200).json({
                    status: "password incorrect of staff"
                })
            }
    } else {
        res.status(200).json({
            status: "already staff login"
        })
    }
}
// staff logout
exports.staff_logout = async (req, res) => {
    await storage.removeItem('stlo_id');
    res.status(200).json({
        status: "staff logout"
    })
}
 
// je user  login thyo a jova
exports.view_login_data = async (req, res) => {
    var stlo_id = await storage.getItem('stlo_id');
    var data = await staff.findById(stlo_id).populate('slo_id');
    // console.log('user',user);
    res.status(200).json({
        status: "watch staff login detail",
        data
    })
}

// ....add 

exports.add_student = async(req,res)=>{
    var stlo_id = await storage.getItem('stlo_id');
    req.body.stlo_id = stlo_id;
    if(stlo_id==undefined){
        res.status(200).json({
            status: "plz login staff"
    })
}
    else
    {
        var data = await student.create(req.body);
        res.status(200).json({
            status: "add student success",
            data
        })
    }  
}

// login staff a je student add kryo te view thay
exports.view_student = async (req, res) => {
    var stlo_id = await storage.getItem('stlo_id');
    var data = await student.find({ "stlo_id": stlo_id }).populate("stlo_id");
    res.status(200).json({
        status: "add selected",
        data
    })
}