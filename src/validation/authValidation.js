import {check} from "express-validator";
import {transValidation} from "../../lang/vi";

let checkRegister = [
  check("email")
    .isEmail().withMessage(transValidation.emailIncorrect)
    .trim(),
  check("username")
    .matches(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/).withMessage(transValidation.usernameIncorrect)
    .isLength({min: 6, max: 30}).withMessage(transValidation.usernameLengthIncorrect),
  check("nameAccount")
    .matches(/^[A-Za-z0-9]+$/).withMessage(transValidation.nameAccountIncorrect)
    .isLength({min: 6, max: 30}).withMessage(transValidation.nameAccountLengthIncorrect),
  check("password")
    .matches(/^[A-Za-z0-9]+$/).withMessage(transValidation.passwordIncorrect)
    .isLength({min: 6, max: 30}).withMessage(transValidation.passwordLengthIncorrect),
  check("gender")
    .isIn(["Male","Female"]).withMessage(transValidation.genderIncorrect)
]

module.exports = {
  checkRegister : checkRegister
}