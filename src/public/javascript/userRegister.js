$("#male").attr('checked', true);

let registerIncorrect = {
  emailIsEmpty : "Bạn cần nhập vào Email !", 
  emailLength : "Địa chỉ email phải có từ 6 đến 30 ký tự!",
  emailIncorrect : "Email bạn nhập vào chưa chính xác chỉ chấp nhận Email có dạng example@gmail.com !", 
  usernameIsEmpty : "Bạn cần nhập vào Tài khoản !", 
  passwordIsEmpty : "Bạn cần nhập vào Mật khẩu !", 
  repairPasswordIncorrect : "Nhập lại mật khẩu chưa chính xác !", 
  genderIncorrect : "Sao giới tính lại sai :( Are you a hacker !", 
  nameAccountIncorrect : "Bạn cần nhập vào tên của bạn !"
}

function alertError(error){
  return `
    <div class="error-register">
    <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
    ${error}
    </div> `;
}



function checkInputRegister(){

  let checkINvalid = true;

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
  if(inputEmail == ""){ modalErrorRegister.append(alertError(registerIncorrect.emailIsEmpty)); checkINvalid = false; }
  if(inputEmail.length<16 || inputEmail.length >40){ modalErrorRegister.append(alertError(registerIncorrect.emailLength)); checkINvalid = false; }

  if(inputNameAccount == ""){ modalErrorRegister.append(alertError(registerIncorrect.nameAccountIncorrect)); checkINvalid = false;  }
  if(inputUserName == ""){ modalErrorRegister.append(alertError(registerIncorrect.usernameIsEmpty)); checkINvalid = false;  }
  if(inputPassword == ""){ modalErrorRegister.append(alertError(registerIncorrect.passwordIsEmpty)); checkINvalid = false;  }
  if(repairPassword !== inputPassword){ modalErrorRegister.append(alertError(registerIncorrect.repairPasswordIncorrect)); checkINvalid = false;  }
  if(checkMale === false && checkFeMale === false){modalErrorRegister.append(alertError(registerIncorrect.genderIncorrect)); checkINvalid = false; }
  if(checkMale === true && checkFeMale === true){modalErrorRegister.append(alertError(registerIncorrect.genderIncorrect)); checkINvalid = false; }

  // validate Email
  function validateEmail(email) {
    var re = /^[a-z0-9]+(?=@gmail.com)(@gmail.com)$/;
    return re.test(email);
  }

  if(!validateEmail(inputEmail)&&inputEmail.length != 0){ modalErrorRegister.append(alertError(registerIncorrect.emailIncorrect)); checkINvalid = false;  }

  
  if(checkINvalid === true){

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