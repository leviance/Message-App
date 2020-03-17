function modelNotif(notifId,senderNotifAvatar,content,timeStamp) {
  return `
      <li class="list-group-item " data-uid="${notifId}" >
          <div>
              <figure class="avatar">
                  <img src="image/userImages/${senderNotifAvatar}" class="rounded-circle">
              </figure>
          </div>
          <div class="users-list-body">
              <h5 style="line-height: 22px !important; ">${content}</h5>
              <p><i style="padding-right: 10px" class="fa fa-clock-o" aria-hidden="true"></i>${timeStamp} </p>
          </div>
      </li>`;
}

function readMoreNotifications(){
  $("#notification-modal .sidebar-body").scroll(function(){
    let heightDIV = $("#notification-modal .sidebar-body").height();
    let heightUL = $("#notification-modal .sidebar-body ul").height();
    let location = $(this).scrollTop();
   
    if(location + heightDIV === heightUL || location + heightDIV > heightUL){
      loadingModal.show();
      let amountNotif = $("#notification-modal .sidebar-body ul li").length;
      
      //$("#notification-modal .sidebar-body").unbind("scroll");

      $.ajax({
        url: "/read-more-notifications",
        type: "POST",
        data: {amountNotif: amountNotif},
        success: function(data) {
          data.forEach(function(notif){
            $("#notification-modal .sidebar-body ul").append(modelNotif(notif._id,notif.senderNotif.avatar,notif.content,notif.time));
          });
          
          loadingModal.hide();
          readMoreNotifications();
        },
        error: function(error){
          loadingModal.hide();
          $("#notification-modal .sidebar-body").unbind("scroll");
        }
      });
      
    }
    
  });
}


$(document).ready(function(){
  readMoreNotifications();
})