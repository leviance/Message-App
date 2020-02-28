$(".register-form").addClass("hide-form");

function showRegisterForm() {
    $(".login-form").toggleClass("hide-form");
    $(".register-form").toggleClass("hide-form");
}

function showLoginForm() {
    $(".login-form").toggleClass("hide-form");
    $(".register-form").toggleClass("hide-form");
    
    // làm rỗng modal alert eror login
    $(".alert-error-login").empty();
}


$(document).ready(function(){

  $(".btn-go-to-login").on("click",function(){
    showLoginForm();
  });

  $(".btn-go-to-register").on("click",function(){
    showRegisterForm();
  });

})