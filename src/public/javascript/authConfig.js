$(".register-form").addClass("hide-form");

function showRegisterForm() {
  $(".btn-go-to-register").on("click",function(){
    $(".login-form").toggleClass("hide-form");
    $(".register-form").toggleClass("hide-form");
  });
}

function showLoginForm() {
  $(".btn-go-to-login").on("click",function(){
    $(".login-form").toggleClass("hide-form");
    $(".register-form").toggleClass("hide-form");
  });
}


$(document).ready(function(){

  showRegisterForm();
  
  showLoginForm();


})