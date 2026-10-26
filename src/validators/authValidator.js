const validator = require('validator');

function ValidateReqData(req){
    const {password, email} = req;

    if(!validator.isStrongPassword(password)){
        throw new Error("Enter Strong Password");
    } 
    if(!validator.isEmail(email)){
        throw new Error("Please Enter Valid Email");
    }
}


module.exports = {
    ValidateReqData
}