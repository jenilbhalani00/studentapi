var school = require('../model/schoolmodel');
var staffmodel = require('../model/staffmodel');
const storage = require('node-persist');
storage.init();

const bcrypt = require('bcrypt');


// school_ragister
exports.school_register = async (req, res) => {
    var b_pass=await bcrypt.hash(req.body.password, 10)
    req.body.password=b_pass
    var data = await school.create(req.body);
    res.status(200).json({
        status: "add school success",
        data
    })
}

exports.get_data = async (req, res) => {
    var data = await school.find(req.body);

    res.status(200).json({
        status: "data selected",
        data,
    })
}

// school delete
exports.school_delete = async (req, res) => {
    var id = req.params.id
    var data = await school.findByIdAndDelete(id);

    res.status(200).json({
        status: "data deleted succussfully",
    })
}

// school data update
exports.school_update = async (req, res) => {
    var id = req.params.id
    var data = await school.findByIdAndUpdate(id, req.body);

    res.status(200).json({
        status: "data update succussfully",
        data
    })
}
// login 
exports.login = async (req, res) => {
    var data = await school.find({ "email": req.body.email })
    var slo_id = await storage.getItem('slo_id');
    console.log(data)
    if(slo_id == undefined){
        
    if (data.length == 1) {

        bcrypt.compare(req.body.password, data[0].password, function(err,result){
            if(result == true){

                storage.setItem('slo_id', data[0].id)

                        res.status(200).json({
                            status: "login success"
                        })
            } else {
            res.status(200).json({
                status: "chek password"
            })

        }
    });
    }
    else {

        res.status(200).json({
            status: "chek password and email"
        })


    }

}
// ek var user login thay gayo hoy and biji var aeno ae user login kare
else{
    res.status(200).json({
        status:"already login"
    })
}
}
// logout school
exports.logout = async (req, res) => {
    await storage.removeItem('slo_id');
    res.status(200).json({
        status: "school logout"
    })
}

// 
// je user  login thyo a jova
exports.login_data = async (req, res) => {
    var slo_id = await storage.getItem('slo_id');
    var data = await school.findById(slo_id);
    res.status(200).json({
        status: "watch login detail",
        data
    })
}

// add staff
// login je school thy a potano staff add kre
exports.addstaff=async(req,res)=>{
    var slo_id = await storage.getItem('slo_id');
    req.body.slo_id = slo_id;
    if(slo_id==undefined){
        res.status(200).json({
            status: "plz login"
            

    })
}
    else
    {
        var data = await staffmodel.create(req.body);
        res.status(200).json({
            status: "add staff success",
            data
        })

    }
   
}
// login school a je staff add kryo te view thay
exports.viewstaff = async (req, res) => {
    var slo_id = await storage.getItem('slo_id');

    var data = await staffmodel.find({'slo_id':slo_id}).populate('slo_id');
    res.status(200).json({
        status: "add selected",
        data
    })
}

/* update staff */
 exports.staff_update= async (req, res) => {
    var slo_id = await storage.getItem('slo_id');
    console.log(slo_id)
    var id= req.params.id
    console.log(id)
    var data = await staffmodel.findById(id);
    console.log(data)
    if(data.slo_id == slo_id)
    {
        var data = await staffmodel.findByIdAndUpdate(id,req.body);
        res.status(200).json({
        status: "staff updated",
        data
      })
    }
    else
    {
        res.status(200).json({
            status: "staff not allow",
            });
    }
};

/* delete staff */
exports.staff_delete = async (req, res) => {
    var slo_id =  await storage.getItem('slo_id');
    var id = req.params.id
    var data = await staffmodel.findById(id);

    if(data.slo_id == slo_id)
        {
              var data = await staffmodel.findByIdAndDelete(id);
            res.status(200).json({
                status: "staff deleted",
            })
        }
        else
        {
            res.status(200).json({
                status: "staff does not deleted",
            })
        }

}
