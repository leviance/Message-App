let modalAddFriends = $("#addFriends .list-friends");

function friendModel(userId,userName,avatar,userClass){
  return `
    <li class="list-friend-item"">
      <figure class="avatar">
          <img src="image/userImages/${avatar}" class="rounded-circle">
      </figure>
      <div class="users-list-body">
          <h5>${userName}</h5>
          <p>LỚP: ${userClass}</p>
      </div>
      <button data-uid="${userId}" type="button" class="btn-add-friend btn btn-primary">Thêm</button>
    </li>`
}

function searchFriends(){
  modalAddFriends.empty();
  let userName = $("#search-friends").val();
  
  $.post("/search-friends",{userName: userName},function(data){
    let countFriends = 0;
    // loại bỏ những người có score = 0, prepend vào modal add friend
    data.forEach(function(friend){
        if(friend.class === null){ friend.class = "Chưa cập nhật thông tin"}
        modalAddFriends.append(friendModel(friend._id, friend.username, friend.avatar, friend.class));
        countFriends += 1;
    })

    addFriends();
    
  }).fail(function(error){
    modalAddFriends.append(`<li class="list-friend-item">Không có kết quả nào phù hợp</li> `);
  })
}

// gửi lời mời kết bạn làm tiếp ở phần sau
function addFriends(){
  $("#addFriends .btn-add-friend").on("click",function(){
    //console.log($(this).data("uid"));
    let srcAvatar = $(this).parent().find("img").attr("src");
    let targetName = $(this).parent().find("h5").text();
    let targetClass = $(this).parent().find("p").text();
    let targetId = $(this).parent().find("button").attr("data-uid");

    // model data to append
    let newReqContactSend = `
          <li class="list-group-item" data-uid="${targetId}">
              <div>
                  <figure class="avatar">
                      <img src="${srcAvatar}" class="rounded-circle">
                  </figure>
              </div>
              <div class="users-list-body">
                  <h5>${targetName}</h5>
                  <p>${targetClass}</p>
                  <div class="users-list-action action-toggle">
                      <div class="dropdown">
                          <a data-toggle="dropdown" href="#">
                              <i class="ti-more"></i>
                          </a>
                          <div class="dropdown-menu dropdown-menu-right">
                              <a href="#" class="dropdown-item">Hủy yêu cầu</a>
                              <a href="#" data-navigation-target="contact-information" class="dropdown-item active">Xem hồ sơ</a>
                              <a href="#" class="dropdown-item">Nhắn tin</a>
                          </div>
                      </div>
                  </div>
              </div>
          </li>`
    
    // them nguoi vừa gửỉ yêu cầu kết bạn vào danh sách lời mời đã gửi 
    $(this).parent().hide();
    $("#list-request-contacts-send .list-group").append(newReqContactSend);

    $.ajax({
      url: `/send-request-contact-${targetId}`,
      type: 'put'
    })
  })
}

$(document).ready(function(){
  $("#btn-search-friends").on("click",function(){
    searchFriends();
  })

  $("#addFriends").keypress(function(event){
    if(event.which == 13){
      searchFriends();
    }
  })

  // add friends
  addFriends();
});