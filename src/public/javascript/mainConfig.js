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
          console.log(error);
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

$(document).ready(function(){
  loadingModal.hide();

  sendUserIdBySocketToServer();

  viewInformation();
 
})