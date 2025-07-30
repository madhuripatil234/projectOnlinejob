let jobmod = require("../model/loginmodel");

exports.adminlogin = (req, res) => {
    let {aname, pass, role } = req.body;

    let promise = jobmod.adminData(aname, pass,role);

    promise.then((result) => {
        res.json({ status: "valid", msg: result });
    }).catch((err) => {
        res.json({ status: "invalid", msg: err });
    });
};

exports.loginhr = (req, res) => {
    let {hname, pass, role } = req.body;

    let promise = jobmod.hrData(hname, pass,role);

    promise.then((result) => {
        res.json({ status: "valid", msg: result });
    }).catch((err) => {
        res.json({ status: "invalid", msg: err });
    });
};

exports.userlogin = (req, res) => {
    let {uname, pass, role } = req.body;

    let promise = jobmod.userData(uname,pass,role);

    promise.then((result) => {
        res.json({ status: "valid", msg: result });
    }).catch((err) => {
        res.json({ status: "invalid", msg: err });
    });
};