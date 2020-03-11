function alertSettingModalStatus(message,status) {
  if(status === "error"){
    $("#alert-error-setting-modal").append(`
    <div class="setting-error" style="color: red;">
        <i style="padding-right: 10px;" class="fa fa-exclamation" aria-hidden="true"></i>
        ${message}
    </div>`)
  }
  if(status === "success"){
    $("#alert-error-setting-modal").append(`
    <div class="setting-success" style="color:#0d9427;">
        <i style="padding-right: 10px;" class="fa fa-check" aria-hidden="true"></i>
        ${message}
    </div>`)
  }
}

function changePassword(){
  $("#alert-error-setting-modal").empty();

  let newPassword = $("#new-password").val();
  let repeatNewPassword = $("#repeat-new-password").val();

  if(newPassword || repeatNewPassword){
    if(newPassword === "" || repeatNewPassword === "") alertSettingModalStatus("Bạn nhập đầy đủ thông tin cần thiết !", "error");
    
    if(newPassword !== repeatNewPassword) alertSettingModalStatus("Nhập lại mật khẩu chưa chính xác !","error");

    if(newPassword.length < 6 || newPassword.length > 30) alertSettingModalStatus("Mật khẩu phải có từ 6 đến 30 ký tự !", "error");

    let regex = new RegExp(/^[a-zA-Z0-9]+$/);
    if(regex.test(newPassword) !== true) alertSettingModalStatus("Mật khẩu không được chứa ký tự đặc biệt !", "error");

    else{
      $.ajax({
        url: "/user-update-password",
        type: "POST",
        data: {newPassword},
        success: function(message){
          alertSettingModalStatus(message,"success");
        },
        error: function(error){
          alertSettingModalStatus(error.responseText,"error");
        }
      })
    }
  }

  
}



$(document).ready(function(){

  // click on button save
  $("#btn-save-settings-modal").on("click", function(){
    changePassword();
  });
  
  $("#settingModal").keypress(function(event) {
    if(event.which === 13)
    changePassword();
  })

  // click close modal
  $("#btn-close-settings-modal").on("click", function(){
    $("#new-password").val("");
    $("#repeat-new-password").val("");
    $("#alert-error-setting-modal").empty();
  });

})