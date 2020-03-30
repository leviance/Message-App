function modelToChangeModalChatPersonal(idToChange){
  return `
      <a href="#" data-navigation-target="contact-information" class="dropdown-item active" data-uid="${idToChange}">Xem hồ sơ</a>
      <a href="#" class="dropdown-item" data-uid="${idToChange}">Thêm vào liên lạc yêu thích</a>
      <a href="#" class="dropdown-item" data-uid="${idToChange}">Xóa tin nhắn</a>
      <a href="#" class="dropdown-item" data-uid="${idToChange}">Chặn</a>
      <div class="dropdown-divider"></div>`
}

function modelToChangeModalChatGroup(idToChange){
  return `
      <a href="#" data-type-chat="chat-group" data-navigation-target="contact-information" class="dropdown-item active" data-uid="${idToChange}">Xem hồ sơ nhóm</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Xem những tệp được chia sẻ</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Thêm thành viên</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Rời nhóm</a>
      <div class="dropdown-divider"></div>`
}

function modelAdminToChangeModalChatGroup(idToChange){
  return `
      <a href="#" data-type-chat="chat-group" data-navigation-target="contact-information" class="dropdown-item active" data-uid="${idToChange}">Xem hồ sơ</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Chuyển quyền quản trị</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Đổi tên nhóm</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Thêm thành viên</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Kích thành viên</a>
      <a href="#" data-type-chat="chat-group" class="dropdown-item" data-uid="${idToChange}">Xóa nhóm</a>
      <div class="dropdown-divider"></div>`
}

function changeOptionModalChat(idToChange,type){
  // thêm option của chat personal
  if(type === "chat-personal"){
    $("#options-modal-chat").find(".dropdown-menu").empty();
    $("#options-modal-chat").find(".dropdown-menu").append(modelToChangeModalChatPersonal(idToChange));

    viewInformation();
  }

  if(type === "chat-group"){
    // kiểm tra xem người dùng có phải là admin của nhóm không
    let groupId = idToChange;

    $.ajax({
      url: `/check-user-is-admin-${groupId}`,
      type: "get",
      // thêm option của chat group nếu là admin 
      success: function() {
        $("#options-modal-chat").find(".dropdown-menu").empty();
        $("#options-modal-chat").find(".dropdown-menu").append(modelAdminToChangeModalChatGroup(idToChange));

        viewInformation();
      },
      // thêm option của chat group nếu không phải admin
      error: function(){
        $("#options-modal-chat").find(".dropdown-menu").empty();
        $("#options-modal-chat").find(".dropdown-menu").append(modelToChangeModalChatGroup(idToChange));

        viewInformation();
      }
    })


  }
}

function viewGroupInformation(idGroup) {
  $.ajax({

  })

}