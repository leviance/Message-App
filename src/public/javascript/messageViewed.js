function messagePersionalViewed(receiverMessId){
  $.ajax({
    url: `/message-persional-viewed-${receiverMessId}`,
    type: "put"
  });

  // gửi socket là tin nhẵn đã được xem đến người gửi 
  let dataToEmit = {
    receiverId: receiverMessId,
    senderId: $("#editProfileModal").attr("data-uid")
  }
  socket.emit("message-persional-viewed",dataToEmit);

}

function messageGroupViewed(receiverMessId){
  $.ajax({
    url: `/message-group-viewed-${receiverMessId}`,
    type: "post",
    success: function(data){
      if(data.nModified > 0){
        showWhoViewedMessRealTime(receiverMessId);
      }
    }
  });
}

// khi người dùng di chuột lên tin nhẵn cuối cùng trong nhóm thì hiển thị những người đã xem
function showPeopleViewedMess(data){
  let countMessagesItem = $("#modal-chat .chat-body .messages").find(".message-item");
  if(countMessagesItem.length > 0){
    let userReaded = "";
  
    data[data.length-1].isReadGroup.forEach(obj =>{
      userReaded = userReaded + obj.username + ` đã xem`  + '\n'; 
    })

    $("#modal-chat .chat-body .messages").find(".message-item:last-child").attr("title",userReaded );
  }
}

// hiển thị những người đã xem tin nhắn real time
function showWhoViewedMessRealTime(receiverMessId){
  messViewerId = $("#editProfileModal").attr("data-uid");
  
  let dataToEmit = {
    receiverId: receiverMessId,
    senderId : messViewerId,
    avatar: $("#userAvatar").attr("src"),
    username: $("#fullname").attr("placeholder")
  }

  socket.emit("show-who-viewed-mess-group", dataToEmit);
}

$(document).ready(function(){
  socket.on("response-message-persional-viewed", (data) => {
    
    let idModalChat = $("#modal-chat").attr("data-uid");

    if(idModalChat === data.senderId){
      let checkMess = $("#modal-chat .chat-body .messages >div:last-child");
      if(checkMess.hasClass("outgoing-message")){
        checkMess.find(".message-action").empty().html(`Đã xem <i class="ti-double-check"></i>`)
      }
    }

  })

  socket.on("response-show-who-viewed-mess-group", data => {
    let chatModalId = $("#modal-chat").attr("data-uid");

    if(chatModalId === data.groupId) {
      let newMessage = $("#modal-chat .chat-body .messages .message-item:last-child")
      let userViewed = newMessage.attr("title");
      
      // nếu tin nhắn có người xem rồi 
      if(userViewed !== undefined){
        userViewed = userViewed + "\n" + data.username + " đã xem"

        newMessage.attr("title",userViewed);

        let amountViewer = newMessage.find(".message-action").html();

        let regex = new RegExp(/[0-9]/);

        amountViewer = regex.test(amountViewer);
        
        amountViewer = Number(amountViewer) + 1;
        newMessage.find(".message-action").html(`${amountViewer} người đã xem <i class="ti-double-check"></i>`);
      }
      // nếu tin nhắn chưa có ai xem
      else{
        newMessage.attr("title",`${data.username} đã xem`);
        newMessage.find(".message-action").html(`1 người xem <i class="ti-double-check"></i>`)
      }
      
    }

  })
})