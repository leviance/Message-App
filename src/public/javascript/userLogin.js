let loginIncorrect = {
  validLoginIncorrect: "Tài khoản hoặc mật khẩu bạn vừa nhập không chính xác vui lòng kiểm tra lại !"
}
// model alert error 
function alertError(error){
  return `
    <div class="error-login">
      <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
      ${error}
    </div>`;
}

// model alertSuccess
function alertSuccess(success){
  return `
    <div class="success-login">
      <i class="fa fa-check" aria-hidden="true"></i>
      ${success}
    </div>`;
}

function login(){
  $(".loading-modal").show();

  let nameAccount = $(".login-nameAccount").val();
  let password = $(".login-password").val();
  let modalAlertLogin = $(".alert-error-login");

  modalAlertLogin.empty();
  
  $.get(`/request-login/${nameAccount}-${password}`,function(data){
    if(data === true) {
      window.location.replace("/");
    }

    $(".loading-modal").hide();
  }).fail(function(error){
    if(error.responseText == "false"){
      return modalAlertLogin.append(alertError(loginIncorrect.validLoginIncorrect));
    }
    
    modalAlertLogin.append(alertError(error.responseText));
    $(".loading-modal").hide();
  });
}

$(document).ready(function(){
  $(".btn-login").on("click",function(){
    login();
  })

  $(".login-form").keypress(function(event){
    if(event.which == 13){
      login();
    }
  })

  $(".loading-modal").hide();
})