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

function addFriends(){
  $("#addFriends .btn-add-friend").on("click",function(){
    console.log($(this).data("uid"));
    
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