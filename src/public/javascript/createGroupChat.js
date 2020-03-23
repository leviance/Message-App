function modelFriendSearchToAddGroup(id,avatar,username,userClass){
  return `
  <li class="list-friend-item" data-uid="${id}">
      <figure class="avatar">
          <img src="image/userImages/${avatar}" class="rounded-circle">
      </figure>
      <div class="users-list-body">
          <h5>${username}</h5>
          <p>${userClass}</p>
      </div>
      <button type="button" class="btn-add-friend btn-add-friend-to-group btn btn-primary">Thêm</button>
  </li>`;
}

function modelFriendSearchToCreateGroup(id,avatar,username,userClass){
  return `
  <li class="list-friend-item" data-uid="${id}">
      <figure class="avatar">
          <img src="${avatar}" class="rounded-circle">
      </figure>
      <div class="users-list-body">
          <h5>${username}</h5>
          <p>${userClass}</p>
      </div>
      <button type="button" class="btn-add-friend btn-remove-friend-to-group btn btn-danger">Xóa</button>
  </li>`;
}

function searchFriendsToAddGroup(){
  $("#list-search-user-to-add-group").empty();

  //  tìm ID những người đã được thêm vào để tạo nhóm để loại bỏ không tìm những người này nữa trên server 
  let listIdUserAdded = [];
  let userAdded = document.querySelectorAll("#list-user-added-to-group li");
  userAdded.forEach(function(userAdded){
    let userAddedId = userAdded.dataset.uid;
    listIdUserAdded.push(userAddedId);
  });


  let keyWords = $("#users").val();
  let skip = $("#list-search-user-to-add-group li").length;
  $.ajax({
    url: "/search-friends-to-add-group",
    type: "POST",
    data: {keyWords, skip, listIdUserAdded: listIdUserAdded},
    success: function(data){
      // append data 
      data.forEach(function(user) {
        if(user.class === null) user.class = "Lớp : chưa cập nhật thông tin !";
        
        $("#list-search-user-to-add-group").append(modelFriendSearchToAddGroup(user._id,user.avatar,user.username,user.class));
      });

      addFriendToGroup();
    },
    error: function(error){
      $("#list-search-user-to-add-group").append(`<p style="text-align: center">${error.responseText}</p>`);
    }
  })
}

function addFriendToGroup(){
  $("#list-search-user-to-add-group li .btn-add-friend-to-group ").on("click", function(){
    let userToAddGroup = $(this).parent("li");
    let id = userToAddGroup.attr("data-uid");
    let avatar = userToAddGroup.find(".avatar img").attr("src");
    let username = userToAddGroup.find(".users-list-body h5").html();
    let userClass = userToAddGroup.find(".users-list-body p").html();

    $("#list-user-added-to-group").prepend(modelFriendSearchToCreateGroup(id,avatar,username,userClass));

    userToAddGroup.remove();

    deleteFriendFromGroup();
  }); 
}

function deleteFriendFromGroup(){
  $("#list-user-added-to-group li .btn-remove-friend-to-group").on("click",function(){
    $(this).parents("li").remove();
  });
}

function loadMoreResultSearch(){
  $("#list-search-user-to-add-group").on("scroll",function(){
    let heightUL = $(this).height();
    let location = $(this).scrollTop() + 2;
    // nhân chiều cao của một thẻ li với tổng các thẻ để ra chiều cao của tất cả 
    let heightLI = $("#list-search-user-to-add-group li").length * $("#list-search-user-to-add-group li").height();

    if(heightUL + location > heightLI){
      //  tìm ID những người đã được thêm vào để tạo nhóm để loại bỏ không tìm những người này nữa trên server 
      let listIdUserAdded = [];
      let userAdded = document.querySelectorAll("#list-user-added-to-group li");
      userAdded.forEach(function(userAdded){
        let userAddedId = userAdded.dataset.uid;
        listIdUserAdded.push(userAddedId);
      });

      // tìm ID những người đã search ra để loại bỏ không tìm lại 
      let userSearched = document.querySelectorAll("#list-search-user-to-add-group li");
      userSearched.forEach(function(userAdded){
        let userAddedId = userAdded.dataset.uid;
        listIdUserAdded.push(userAddedId);
      });

      let keyWords = $("#users").val();
      let skip = $("#list-search-user-to-add-group li").length;
      $.ajax({
        url: "/search-friends-to-add-group",
        type: "POST",
        data: {keyWords, skip, listIdUserAdded: listIdUserAdded},
        success: function(data){
          // append data 
          data.forEach(function(user) {
            if(user.class === null) user.class = "Lớp : chưa cập nhật thông tin !";
            
            $("#list-search-user-to-add-group").append(modelFriendSearchToAddGroup(user._id,user.avatar,user.username,user.class));
          });

          addFriendToGroup();
        },
        error: function(error){
          $("#list-search-user-to-add-group").append(`<p style="text-align: center">Không tìm thấy thêm kết quả</p>`);
          $("#list-search-user-to-add-group").unbind("scroll");
        }
      })

    }

  });
}

function createNewGroup() {
  let modalAlertCreateGroup = $("#modal-error-create-group");
  modalAlertCreateGroup.empty();

  let groupName = $("#group_name").val();
  let description = $("#description").val();

  if(groupName === "") return modalAlertCreateGroup.append(`<p class="error" style="color: red;">Bạn chưa nhập tên nhóm !</p>`);
  if(description === "") return modalAlertCreateGroup.append(`<p class="error" style="color: red;">Bạn chưa nhập lời giới thiệu !</p>`)
  if(groupName.length < 6 || groupName.length > 45) return modalAlertCreateGroup.append(`<p class="error" style="color: red;">Tên nhóm phải có từ 6 đến 45 ký tự !</p>`);
  if(description.length < 6 || description.length > 100) return modalAlertCreateGroup.append(`<p class="error" style="color: red;">Lời giới thiệu phải có từ 6 đến 100 ký tự !</p>`);
  let regex = new RegExp(/^[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]+$/);     
  if(!regex.test(groupName)) return modalAlertCreateGroup.append(`<p class="error" style="color: red;">Tên nhóm không được có ký tự đặc biệt !</p>`);
  if(!regex.test(description)) return modalAlertCreateGroup.append(`<p class="error" style="color: red;">Mô tả nhóm không được có ký tự đặc biệt !</p>`);

  //  tìm ID những người đã được thêm vào để tạo nhóm để loại bỏ không tìm những người này nữa trên server 
  let listIdUserAdded = [];
  let userAdded = document.querySelectorAll("#list-user-added-to-group li");
  userAdded.forEach(function(userAdded){
    let userAddedId = userAdded.dataset.uid;
    listIdUserAdded.push(userAddedId);
  });

  if(listIdUserAdded.length < 2) return modalAlertCreateGroup.append(`<p class="error" style="color: red;"> Cần tối thiểu 2 thành viên để tạo nhóm !</p>`);

  $.ajax({
    url: "/create-new-group-chat",
    type: "POST",
    data: {listIdUserAdded: listIdUserAdded,groupName,description},
    success: function(data){
      modalAlertCreateGroup.append(`<p class="success" style="color:#3db16b">Tạo nhóm thành công.</p>`);
      $("#group_name").val("");
      $("#list-user-added-to-group").empty();
      $("#list-search-user-to-add-group").empty();
      $("#users").val("");
      $("#description").val("");

      // handle real time send notification for all members
      let dataToEmit = {
        groupId : data._id,
        userCreateGroupId : data.userCreatedId, 
        members : data.members,
        groupName : data.groupName,
        avatar: data.avatar,
        description: data.description
      }
      socket.emit("create-new-group",dataToEmit);
    },
    error: function(error){
      modalAlertCreateGroup.append(`<p class="error" style="color: red;">${error}</p>`);
    }
  });

  getMessages();
  tickMessActive();
}

function modelMessChatGroup(groupId,avatar,groupName,description){
  return `
    <li class="list-group-item click-to-chats" data-uid="${groupId}" data-type="chat-group" >
        <figure class="avatar avatar-state-success">
            <img src="image/userImages/${avatar}" class="rounded-circle">
        </figure>
        <div class="users-list-body">
            <h5>${groupName}</h5>
            <p>${description}</p>
            <div class="users-list-action">
                <div class="new-message-count">+</div>
            </div>
        </div>
    </li>`;
}

$(document).ready(function(){
  $("#users").on("keypress",function(event){
    if(event.which === 13){
      searchFriendsToAddGroup();
    }
  });

  $("#btn-search-friends-to-add-group").on("click",function(){searchFriendsToAddGroup()});

  addFriendToGroup();

  loadMoreResultSearch();

  $("#btn-create-new-group").on("click",function(){
    createNewGroup();
  });

  socket.on("response-create-new-group", data => {
    let groupId = data.groupId;
    let avatar = data.avatar;
    let groupName = data.groupName;
    let description = data.description;

    $("#list-messages").prepend(modelMessChatGroup(groupId,avatar,groupName,description));

    getMessages();
    tickMessActive();
  })

})