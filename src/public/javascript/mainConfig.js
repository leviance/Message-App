const socket = io({reconnection: false});

let loadingModal = $(".loading-modal");

function viewInformation(){
  $(".dropdown-item").on("click", function(){
    let userId = $(this).attr("data-uid");
    let type = $(this).attr("data-navigation-target");

    if(type === "contact-information"){
      loadingModal.show();
      $.ajax({
        url: `/view-user-information-${userId}`,
        type: "get",
        success: function(user){
          $("#view-user-infor-avatar").attr("src",`image/userImages/${user.avatar}`);

          $("#view-user-infor-name").html(user.username);

          if(user.class === null) $("#view-user-infor-class").html("Chưa cập nhật thông tin !");
          else $("#view-user-infor-class").html(user.class);

          if(user.about === null) $("#view-user-infor-about").html("Chưa cập nhật thông tin !");
          else $("#view-user-infor-about").html(user.about);

          if(user.phoneNumber === null) $("#view-user-infor-phoneNumber").html("Chưa cập nhật thông tin !");
          else $("#view-user-infor-phoneNumber").html(user.phoneNumber);

          $("#view-user-infor-images").empty();
          if(user.images.length === 0) $("#view-user-infor-images").append(`
            <li class="list-inline-item">
                <a href="#">
                    <figure class="avatar avatar-lg">
                        <img src="image/userImages/${user.avatar}">
                    </figure>
                </a>
            </li>`);
          else {
            user.images.forEach(image =>{
              $("#view-user-infor-images").append(`
                <li class="list-inline-item">
                    <a href="#">
                        <figure class="avatar avatar-lg">
                            <img src="image/userImages/${image}">
                        </figure>
                    </a>
                </li>`);
            });
          }
          
          if(user.address === null) $("#view-user-infor-address").html("Chưa cập nhật thông tin !");
          else $("#view-user-infor-address").html(user.address);

          if(user.website === null) $("#view-user-infor-website").html("Chưa cập nhật thông tin !");
          else $("#view-user-infor-website").html(user.website);

          if(user.linkSocial.facebook) $("#view-user-infor-facebook").attr("href", user.linkSocial.facebook);
          if(user.linkSocial.instagram) $("#view-user-infor-instagram").attr("href", user.linkSocial.instagram);

          loadingModal.hide();
        },
        error(error){
          loadingModal.hide();
        }
      })
    }
    
  })
}

function sendUserIdBySocketToServer() {
  // send user id to server
  let userId = $("#editProfileModal").attr("data-uid");
  socket.emit('userId', {userId : userId });
  
}

function tickReadNotif(){
  $("#btn-view-notification").unbind('click').on('click', function(){
    let className = $(this).attr('class');
    
    // bỏ nền xanh ra khỏi thông báo
    if(className === "active" || className === "active notifiy_badge" || className === ""){
      let listNotif = document.querySelectorAll("#notification-modal .sidebar-body ul li.unread_notification");
      let listNotifUnread = [];
      
      listNotif.forEach(function(notif){
        notif.classList.remove("unread_notification");
        listNotifUnread.push(notif.dataset.uid);
      });

      // tick isRead : true in server 
      $.ajax({
        url: "/list-notification-viewed",
        type: "post",
        data: {listNotifUnread : listNotifUnread}
      })

    }

    // bỏ chấm đỏ khỏi biểu tượng thông báo
    if(className === "active" || className === "notifiy_badge" || className === "" || className === "notifiy_badge active" || className=== "active notifiy_badge"){ 
      $(this).removeClass("notifiy_badge");
    }

  })
}

function notAcceptMakeFriend(){
  $(".btn-remove-req-contact").on("click", function(){
    let senderReqId = $(this).attr("data-uid");
    let receiverReqId = $("#editProfileModal").attr("data-uid");

    $.ajax({
      url: `/do-not-accept-make-friend-${senderReqId}-${receiverReqId}`,
      type: "put"
    })

    $(this).parents("li").remove();

  });
}

function removeAllNotifications(){
  $("#remove_all_notifications").on("click", function(){
    let targetId = $("#editProfileModal").attr("data-uid");
    
    $.ajax({
      url: `/remove-all-notifications-${targetId}`,
      type: "put",
    });

    // để nó không load thêm thông báo khi ấn nút xóa
    $("#notification-modal .sidebar-body").unbind("scroll");

    // xóa
    $("#notification-modal .sidebar-body ul").empty();
  });
}



$(document).ready(function(){
  loadingModal.hide();

  sendUserIdBySocketToServer();

  viewInformation();

  tickReadNotif();

  removeAllNotifications();

  notAcceptMakeFriend();
 
})