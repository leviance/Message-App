$("#male").attr('checked', true);
let gender = "Male";

let registerIncorrect = {
  emailIsEmpty : "Bạn cần nhập vào Email !", 
  emailLength : "Địa chỉ email phải có từ 6 đến 30 ký tự!",
  emailIncorrect : "Email bạn nhập vào chưa chính xác chỉ chấp nhận Email có dạng example@gmail.com !", 

  nameAccountIsEmty : "Bạn cần nhập vào tên của bạn !",
  nameAccountLengthIncorrect : "Tên tài khoản cần có tối thiểu 6 ký tự , tối đa 30 !",
  nameAccounIncorrect: "Tài khoản chỉ được chứa chữ thường chữ hoa và số !",

  usernameIsEmpty : "Bạn cần nhập vào Tên của bạn !", 
  usernameLengthIncorrect : "Họ và Tên cần có tối thiểu 6 ký tự , tối đa 30 !",
  usernameIncorrect: "Họ và Tên chỉ được chứa chữ thường chữ hoa và số và dấu cách !",

  passwordIsEmpty : "Bạn cần nhập vào Mật khẩu !", 
  passwordLengthIncorrect: "Mật khẩu phải có từ 6 đến 30 ký tự !",
  passwordIncorrect: "Mật khẩu chỉ được chứa chữ thường chữ hoa và số !",

  repairPasswordIncorrect : "Nhập lại mật khẩu chưa chính xác !", 
  genderIncorrect : "Sao giới tính lại sai :( Are you a hacker !"

}

// model alert error 
function alertError(error){
  return `
    <div class="error-register">
    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    ${error}
    </div> `;
}

// validate Email
function validateEmail(email) {
  let re = /^[a-z0-9]+(?=@gmail.com)(@gmail.com)$/;
  return re.test(email);
}

// validate nameAccount
function validateNameAccount(nameAccount) {
  let regexAccount = /^[A-Za-z0-9]+$/;
  return regexAccount.test(nameAccount);
}

// validate userName
function validateUserName(nameAccount) {
  let regexAccount = /^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/;
  return regexAccount.test(nameAccount);
}



function checkInputRegister(){

  let checkInvalid = true;

  let inputEmail = $("#register-email").val();
  let inputNameAccount = $("#register-nameAccount").val();
  let inputUserName = $("#register-username").val();
  let inputPassword = $("#register-password").val();
  let repairPassword = $("#repair-password").val();
  let checkMale = $("#male").is(":checked");
  let checkFeMale = $("#female").is(":checked");

  // append error to form
  let modalErrorRegister = $(".alert-error-register");

  modalErrorRegister.empty();

  // check Email
  if(inputEmail == ""){ modalErrorRegister.append(alertError(registerIncorrect.emailIsEmpty)); checkInvalid = false; }
  if(inputEmail.length<16 || inputEmail.length >30){ modalErrorRegister.append(alertError(registerIncorrect.emailLength)); checkInvalid = false; }
  if(!validateEmail(inputEmail)&&inputEmail.length != 0){ modalErrorRegister.append(alertError(registerIncorrect.emailIncorrect)); checkInvalid = false;  }

  // check nameAccount
  if(inputNameAccount == ""){ modalErrorRegister.append(alertError(registerIncorrect.nameAccountIsEmty)); checkInvalid = false;  }
  if(inputNameAccount.length < 6 || inputNameAccount.length > 30 ){ modalErrorRegister.append(alertError(registerIncorrect.nameAccountLengthIncorrect)); checkInvalid = false;  }
  if(!validateNameAccount(inputNameAccount)&&inputNameAccount.length != 0){ modalErrorRegister.append(alertError(registerIncorrect.nameAccounIncorrect)); checkInvalid = false;  }
  
  // check username 
  if(inputUserName == ""){ modalErrorRegister.append(alertError(registerIncorrect.usernameIsEmpty)); checkInvalid = false;  }
  if(inputUserName.length < 6 || inputUserName.length > 30 ){ modalErrorRegister.append(alertError(registerIncorrect.usernameLengthIncorrect)); checkInvalid = false;  }
  if(!validateUserName(inputUserName)&&inputUserName.length != 0){ modalErrorRegister.append(alertError(registerIncorrect.usernameIncorrect)); checkInvalid = false;  }

  // check password
  if(inputPassword == ""){ modalErrorRegister.append(alertError(registerIncorrect.passwordIsEmpty)); checkInvalid = false;  }
  if(inputPassword.length < 6 || inputPassword.length > 30 ){ modalErrorRegister.append(alertError(registerIncorrect.passwordLengthIncorrect)); checkInvalid = false;  }
  if(!validateNameAccount(inputPassword)&&inputPassword.length != 0){ modalErrorRegister.append(alertError(registerIncorrect.passwordIncorrect)); checkInvalid = false;  }

  if(repairPassword !== inputPassword){ modalErrorRegister.append(alertError(registerIncorrect.repairPasswordIncorrect)); checkInvalid = false;  }

  if(checkMale === false && checkFeMale === false){modalErrorRegister.append(alertError(registerIncorrect.genderIncorrect)); checkInvalid = false; }
  if(checkMale === true && checkFeMale === true){modalErrorRegister.append(alertError(registerIncorrect.genderIncorrect)); checkInvalid = false; }
  if(checkFeMale === true){ gender = "Female";}

  let user = {
    username: inputUserName,
    email : inputEmail,
    nameAccount : inputNameAccount,
    password : inputPassword,
    gender: gender
  }

  console.log(user);
  if(checkInvalid === true){
    $.post("/create-new-account", user, function(data){
      console.log(data);
    })
  }

}

$(document).ready(function(){

//  check when click or enter
$(".btn-register").on("click", function(){
  checkInputRegister();
  
});

$(".register-form").keypress(function(event) {
  if(event.which === 13) {
    checkInputRegister();
  }
});

})