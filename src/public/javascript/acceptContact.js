function acceptContact(){
  let btnAcceptContact = $(".btn-accept-contact");
  btnAcceptContact.on("click", function(){
    let targetId = $(this).attr("data-uid");

    $.ajax({
      url: `/accept-contact-${targetId}`,
      type: "post",
      success: function(data) {
        let dataToEmit = {
          notifId: data._id,
          receiverId: targetId,
          senderId : $("#editProfileModal").attr("data-uid"),
          avatar: $("#userAvatar").attr("src"),
          username: $("#fullname").attr("placeholder")
        }

        socket.emit("accept-contact",dataToEmit);

      }
    });
  
    //  prepend to list friends
    let userId = targetId;
    let avatar = $(this).parents("li").find("img").attr("src");
    let username = $(this).parents("li").find("h5").html();

    $("#friends .sidebar-body ul").prepend(modelFriendToApendListFriends(userId,avatar,username));

    $(this).parents("li").remove();

    viewInformation();
  });
  
}

function modelFriendToApendListFriends(userId,avatar,username){
  return `
  <li class="list-group-item click-to-chats" data-uid="${userId}" style="position: relative">
      <div>
          <figure class="avatar">
              <img src="${avatar}" class="rounded-circle">
          </figure>
      </div>
      <div class="users-list-body">
          <h5>${username}</h5>
          <p> Bạn mới </p>
          <div class="users-list-action action-toggle">
              <div class="dropdown">
                  <a data-toggle="dropdown" href="#">
                      <i class="ti-more"></i>
                  </a>
                  <div class="dropdown-menu dropdown-menu-right">
                      <a href="#" data-uid="${userId}" data-navigation-target="contact-information" class="dropdown-item">Xem hồ sơ</a>
                      <a href="#" data-uid="${userId}" class="dropdown-item">Thêm vào liên hệ yêu thích</a>
                      <a href="#" data-uid="${userId}" class="dropdown-item">Hủy kết bạn</a>
                      <a href="#" data-uid="${userId}" class="dropdown-item">Chặn</a>
                  </div>
              </div>
          </div>
      </div>
      <div class="support-click" style="position: absolute; height: 100%; width: 75%; background-color:rgba(0, 255, 255, 0);"></div>
  </li>`;
}

$(document).ready(function(){
 
  acceptContact();
  
  // xu ly real time
  socket.on("response-accept-contact", data => {
    
    $("#list-request-contacts-send ").find(`ul li[data-uid = ${data.senderId}]`).remove();
    
    let modelNotification = `
      <li class="list-group-item unread_notification click-to-chats" data-uid="${data.notifId}" >
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
    //  prepend to list friends
    $("#friends .sidebar-body ul").prepend(modelFriendToApendListFriends(data.senderId,data.avatar,data.username));

    openModalChat();
    viewInformation();
  });

})