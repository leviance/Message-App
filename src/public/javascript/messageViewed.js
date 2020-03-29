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
  console.log(receiverMessId);
  $.ajax({
    url: `/message-group-viewed-${receiverMessId}`,
    type: "put"
  });

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
})