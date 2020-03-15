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
    
   
    // thông báo real time làm ở bài sau
    // avatar: "image/userImages/1584275257379-qudo-83099310_2452637865001590_1831061265431134208_o.jpg"
    //  ​
    // receiverId: "5e6b5983f7059b2833ed80c6"  id của người chấp nhận lời mời kết bạn 
    //      ​
    // senderId: "5e6c5991393d6f4e5173ccd7"
    //      ​
    // username: "Dũng Dương"
  });

})