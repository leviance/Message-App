function cancelReqContactSend(){
  $(".btn-cancel-req-contact").on("click", function(){
    let receiverReqContact = $(this).attr("data-uid");
    let senderReqContact = $("#editProfileModal").attr("data-uid");

    $.ajax({
      url: `/cancel-request-contact-send-${receiverReqContact}`,
      type: "PUT",
    });

    let dataToEmit = {
      receiverId: receiverReqContact,
      senderId: senderReqContact
    }

    socket.emit("cancel-req-contact", dataToEmit);

    $(this).parents("li").remove();

  })
}

$(document).ready(function() {
  cancelReqContactSend();

  socket.on("response-cancel-req-contact", data => {
    $("#list-request-contacts-received").find(`ul li[data-uid= ${data.senderId}]`).remove();
  });

})