let avatarOrigin = $('#userAvatar').attr('src');
let inputUserName = $("#fullname");
let inputAdress = $("#city");
let inputPhoneNumber = $("#phone");
let inputClass = $("#class");


function modalAlertErrorUpdate(message){
  let modalError = `<p class="alert-error-update-infor">${message}</p>`;
  $("#modal-error-update-infor").append(modalError);
}

function modalAlertSucessUpdate(message){
  let modalSuccess =  `<p class="alert-success-update-infor">${message}</p>`;
  $("#modal-error-update-infor").append(modalSuccess);
}

function changeAvatar(){
  $("#customFile").on("change",(event)=>{
    let fileToUpdateAvatar = event.target.files[0];

    let checkType = ["image/jpg", "image/png", "image/jpeg"];
    let checkSize = 1048576;
    $("#modal-error-update-infor").empty();

    // if(fileToUpdateAvatar.size > checkSize){
    //   modalAlertErrorUpdate("File quá lớn chỉ được upload tối đã 1MB !");
    //   return;
    // }
    // if($.inArray(fileToUpdateAvatar.type,checkType) === -1){
    //   modalAlertErrorUpdate("Chỉ được upload ảnh !");
    //   return;
    // }

    let fileReader = new FileReader();

    fileReader.onload = () =>{
      $("#userAvatar").attr("src",fileReader.result);
    }

    fileReader.readAsDataURL(fileToUpdateAvatar);


  });
}


$(document).ready(function(){
  // change avatar when choose file
  changeAvatar();

  // cancel edit
  $("#cancel-update-user-infor").on("click",()=>{
    $("#userAvatar").attr("src",avatarOrigin);
    inputUserName.val("");
    inputPhoneNumber.val("");
    inputAdress.val("");
    inputClass.val("");
  })
  
  // submit data to server
  $("#btn-update-user-infor").on("click",()=>{

    let formData = new FormData($("#form-update-user-info")[0]);
    $("#modal-error-update-infor").empty();
    $.ajax({
      url: "/update-user-infor",
      type: "POST",
      data: formData,
      cache: false,
      processData: false,
      contentType: false,
      success: function(message){
        modalAlertSucessUpdate(message);
      }, 
      error: function(error){
        modalAlertErrorUpdate(error.responseText);
      }
    })
  })


})