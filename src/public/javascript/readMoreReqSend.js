function modelReqContactSend(senderId,avatar,username,gender){
  return `
  <li class="list-group-item" data-uid="${senderId}" <="" li="">
                <div>
                    <figure class="avatar">
                        <img src="image/userImages/${avatar}" class="rounded-circle">
                    </figure>
                </div>
                <div class="users-list-body">
                    <h5>${username}</h5>
                    <p>${gender}</p>
                    <div class="users-list-action action-toggle">
                        <div class="dropdown">
                            <a data-toggle="dropdown" href="#" aria-expanded="false">
                                <i class="ti-more"></i>
                            </a>
                            <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; transform: translate3d(-142px, 23px, 0px); top: 0px; left: 0px; will-change: transform;">
                                <a href="#" class="dropdown-item btn-cancel-req-contact" data-uid="${senderId}">Hủy yêu cầu</a>
                                <a href="#" data-navigation-target="contact-information" data-uid="${senderId}" class="dropdown-item">Xem hồ sơ</a>
                                <a href="#" data-uid="${senderId}" class="dropdown-item">Nhắn tin</a>
                            </div>
                        </div>
                    </div>
                </h5></div>
            </li>`;
}

function readMoreReqSend(){
  $("#list-request-contacts-received .sidebar-body").on("scroll", function(){
    
    let location = $(this).scrollTop() + 2;
    let heightDIV = $(this).height();
    let heightUL = $("#list-request-contacts-received .sidebar-body ul").height();

    let amountReqReceived = $("#list-request-contacts-received .sidebar-body ul li").length;

    if(heightDIV + location > heightUL){
      loadingModal.show();

      $.ajax({
        url: `/read-more-request-contacts-received-${amountReqReceived}`,
        type: "get",
        success: function(data){
          data.forEach(function(contact){
            let senderId = contact._id;
            let avatar = contact.avatar;
            let username = contact.username;
            let gender;
            if(contact.gender === "Male") gender = "Nam";
            else gender = "Nữ";

            $("#list-request-contacts-received .sidebar-body ul").append(modelReqContactSend(senderId,avatar,username,gender));
            
            loadingModal.hide();
            viewInformation();
            cancelReqContactSend();
          })

        },
        error: function(){
          loadingModal.hide();
          $("#list-request-contacts-received .sidebar-body").unbind("scroll");
        }
      })
    }

  })
}


$(document).ready(function(){
  readMoreReqSend();
})