function acceptContact(){
  let btnAcceptContact = $(".btn-accept-contact");
  btnAcceptContact.on("click", function(){
    let targetId = $(this).attr("data-uid");

    $.ajax({
      url: `/accept-contact-${targetId}`,
      type: "put"
    });
  
    let dataToEmit = {
      receiverId: targetId,
      senderId : $("#editProfileModal").attr("data-uid"),
      avatar: $("#userAvatar").attr("src"),
      username: $("#fullname").attr("placeholder")
    }
    
    $(this).parents("li").remove();

    socket.emit("accept-contact",dataToEmit);

  });
  
}

$(document).ready(function(){
 
  acceptContact();
  
  // xu ly real time
  socket.on("response-accept-contact", data => {
    
    $("#list-request-contacts-send ").find(`ul li[data-uid = ${data.senderId}]`).remove();
    
    let modelNotification = `
      <li class="list-group-item unread_notification" data-uid="${data.receiverId}" >
          <div>
              <figure class="avatar">
                  <img src="${data.avatar}" class="rounded-circle">
              </figure>
          </div>
          <div class="users-list-body">
              <h5 style="line-height: 22px !important; "><strong style="color: #3db16b;">${data.username}</strong> đã chấp nhận lời mời kết bạn của bạn.</h5>
              <p><i style="padding-right: 10px" class="fa fa-clock-o" aria-hidden="true"></i>Vừa xong </p>
          </div>
      </li>`;

    $("#notification-modal .sidebar-body ul").prepend(modelNotification);
    $("#btn-view-notification").addClass("notifiy_badge");
    
    tickReadNotif();
  });

})