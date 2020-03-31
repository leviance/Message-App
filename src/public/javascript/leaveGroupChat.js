function leaveGroupChat(){
  $(".dropdown-item").on("click", function(){
    let typeOfOption = $(this).attr("data-navigation-target");

    if(typeOfOption == "leave-group"){
      let groupId = $(this).attr("data-uid");
  
      $.ajax({
        url: `/leave-group-chat-${groupId}`,
        type: "put",
      });
  
      $("#chats .sidebar-body ul").find(`li[data-uid=${groupId}]`).remove();
  
      $("#modal-chat .chat-body .messages").empty();
  
      $("#modal-chat").attr("data-uid","");
  
      $("#chats .sidebar-body ul li:first-child").click();

      let dataToEmit = {
        receiverId: groupId,
        senderId: $("#editProfileModal").attr("data-uid")
      }

      socket.emit("member-leave-group-chat",dataToEmit);
    }
  
  })
}

$(document).ready(function(){
  leaveGroupChat();

  socket.on("response-member-leave-group-chat", data => {
    $("#notification-modal .sidebar-body ul").prepend(`
    <li class="list-group-item  unread_notification " data-uid="${data.notifId}">
        <div>
            <figure class="avatar">
                <img src="image/userImages/${data.avatar}" class="rounded-circle">
            </figure>
        </div>
        <div class="users-list-body">
            <h5 style="line-height: 22px !important; ">${data.username} đã rời khỏi nhóm ${data.groupName}.</h5>
            <p><i style="padding-right: 10px" class="fa fa-clock-o" aria-hidden="true"></i> Vừa xong </p>
            <div class="users-list-action action-toggle">
                <div class="dropdown">
                    <a data-toggle="dropdown" href="#" aria-expanded="false">
                        <i class="ti-more"></i>
                    </a>
                    <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; transform: translate3d(-201px, 22px, 0px); top: 0px; left: 0px; will-change: transform;">
                        <a href="#" class="dropdown-item btn-cancel-req-contact" data-uid="${data.senderId}">Tắt thông báo từ người này</a>
                        <a href="#" data-navigation-target="contact-information" data-uid="${data.senderId}" class="dropdown-item">Xem hồ sơ</a>
                        <a href="#" data-uid="${data.senderId}" class="dropdown-item">Chặn</a>
                    </div>
                </div>
            </div>
        </div>
    </li>`);

    $("#btn-view-notification").addClass("notifiy_badge");

    tickReadNotif();
    removeNotifWhenReceivedNewReqContact();
  })  

})