let modalAddMember = $("#addFriendToGroup .list-friends");

function addMemberToGroup(){
  $("#search-friend-to-add-group").unbind("keypress").on("keypress", function(event){
    if(event.which === 13){
      handleSearchFriendsToAddGroup();
    }
  })

  $("#btn-search-friend-to-add-group").unbind("click").on("click", function(){
    handleSearchFriendsToAddGroup();
  })
}

function handleSearchFriendsToAddGroup(){
  let keyWords = $("#search-friend-to-add-group").val();
  let skip = 0;
  let groupId = $("#modal-chat").attr("data-uid");

  modalAddMember.empty();
  $.ajax({
    url: "/search-member-to-add-group-chat",
    type: "POST",
    data: {keyWords,skip,groupId},
    success: function(data) {
      
      data.forEach(function(member){
        (member.gender === "Male") ? member.gender = "Nữ" : member.gender = "Nam";

        modalAddMember.append(memberModel(member._id, member.username, member.avatar, member.gender));

        handleAddMemberToGroup();
      });


    },
    error: function(error){
      modalAddMember.append(`<li class="list-friend-item">Không có kết quả nào phù hợp</li> `);
    }
  })
}

function memberModel(userId,userName,avatar,gender){
  return `
    <li class="list-friend-item"">
      <figure class="avatar">
          <img src="image/userImages/${avatar}" class="rounded-circle">
      </figure>
      <div class="users-list-body">
          <h5>${userName}</h5>
          <p>${gender}</p>
      </div>
      <button data-uid="${userId}" type="button" class="btn-add-member btn btn-primary">Thêm</button>
    </li>`
}

function handleAddMemberToGroup(){
  modalAddMember.find(".btn-add-member").unbind("click").on("click",function(){
    let userIdToAddGroup = $(this).attr("data-uid");
    let groupId = $("#modal-chat").attr("data-uid");
    
    $.ajax({
      url: `/add-member-to-group-chat-${userIdToAddGroup}-${groupId}`,
      type: "put",
    });

    $(this).parents("li").remove();

    let dataToEmit = {
      receivedId: groupId,
      senderId: $("#editProfileModal").attr ("data-uid"),
      userIdToAddGroup: userIdToAddGroup,
      nameOfUserAddMember: $("#fullname").attr("placeholder") 
    }
    socket.emit("add-member-to-group-chat",dataToEmit);
  })
}

// làm trống modal mỗi khi modal ẩn đi 
function emptyModalAddMemberToGroupChat(){
  $(".add-member-to-group").on("click", function(){
    modalAddMember.empty();
  })
}

$(document).ready(function(){
  addMemberToGroup();

  socket.on("response-add-member-to-group-chat", data => {
    $("#btn-view-list-chat").addClass("notifiy_badge");
    $("#btn-view-notification").addClass("notifiy_badge");
    // nếu người dùng là người được thêm vào nhóm
    if(data.groupId){
      $("#notification-modal .sidebar-body ul").prepend(`
      <li class="list-group-item  unread_notification " data-uid="${data.notifId}">
          <div>
              <figure class="avatar">
                  <img src="image/userImages/${data.avatar}" class="rounded-circle">
              </figure>
          </div>
          <div class="users-list-body">
              <h5 style="line-height: 22px !important; ">${data.nameOfUserAddMember} đã thêm bạn vào nhóm ${data.groupName}</h5>
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

      // thêm conversation vào chat 
      $("#list-messages").prepend(`
        <li class="list-group-item click-to-chats open-chat" data-uid="${data.groupId}" data-type="chat-group">
            <figure class="avatar avatar-state-success">
                <img src="image/userImages/${data.groupAvatar}" class="rounded-circle">
            </figure>
            <div class="users-list-body">
                <h5>${data.groupName}</h5>
                <p>Bạn vừa được thêm vào nhóm</p>
                <div class="users-list-action">
                  <div class="new-message-count">+</div>
                </div>
            </div>
        </li>`)
    }

    else{
      $("#notification-modal .sidebar-body ul").prepend(`
      <li class="list-group-item  unread_notification " data-uid="${data.notifId}">
          <div>
              <figure class="avatar">
                  <img src="image/userImages/${data.avatar}" class="rounded-circle">
              </figure>
          </div>
          <div class="users-list-body">
              <h5 style="line-height: 22px !important; ">${data.nameOfUserAddMember} đã thêm ${data.username} vào nhóm ${data.groupName}</h5>
              <p><i style="padding-right: 10px" class="fa fa-clock-o" aria-hidden="true"></i> Vừa xong </p>
              <div class="users-list-action action-toggle">
                  <div class="dropdown">
                      <a data-toggle="dropdown" href="#" aria-expanded="false">
                          <i class="ti-more"></i>
                      </a>
                      <div class="dropdown-menu dropdown-menu-right" x-placement="bottom-end" style="position: absolute; transform: translate3d(-201px, 22px, 0px); top: 0px; left: 0px; will-change: transform;">
                          <a href="#" class="dropdown-item btn-cancel-req-contact" data-uid="${data.receiverId}">Tắt thông báo từ người này</a>
                          <a href="#" data-navigation-target="contact-information" data-uid="${data.receiverId}" class="dropdown-item">Xem hồ sơ</a>
                          <a href="#" data-uid="${data.receiverId}" class="dropdown-item">Chặn</a>
                      </div>
                  </div>
              </div>
          </div>
      </li>`);
    }

    viewInformation();
    getMessages();
    tickReadNotif();
    removeAmountMessNotRead();
  })
})