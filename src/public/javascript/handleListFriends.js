function openModalChat(){
  $("#friends .sidebar-body ul li .support-click").on("click",function(){
    $("#modal-chat-person").show();
    $("#modal-chat-group").hide();

    let avatar = $(this).parents("li").find("img").attr("src");
    let username = $(this).parents("li").find("h5").html();
    let idFriend = $(this).parents("li").attr("data-uid");

    $("#content-chat-person-avatar").attr("src", avatar);
    $("#content-chat-person-name").html(username);
    $("#modal-chat-person").attr("data-uid",idFriend);

    // load mess from server
    let receiverMessId = $(this).parents("li").attr("data-uid");
    let type = "personal";

    $(".modal-loading-message").show();
    $.ajax({
      url: "/get-messages",
      type: "post",
      data: {receiverMessId,type},
      success: function(data) {
        
        if(data.length === 0){
          $("#modal-chat-person .chat-body .messages").empty();
        }

        else{
          let senderId = $("#editProfileModal").attr("data-uid");

          data.forEach( mess => {
            // nếu tin nhắn là mình gửi 
            if(mess.sender.id === senderId){
              // nếu đã xem
              if(mess.updatedAt !== null){
                $('.layout .content .chat .chat-body .messages').append(`
                <div class="message-item outgoing-message">
                    <div class="message-content">
                        ${mess.text}
                    </div>
                    <div class="message-action">
                        ${data.humanTime} <i class="ti-double-check"></i>
                    </div>
                </div>`);
              }
              // nếu chưa xem 
              else{
                $('.layout .content .chat .chat-body .messages').append(`
                <div class="message-item outgoing-message">
                    <div class="message-content">
                        ${mess.text}
                    </div>
                    <div class="message-action">
                        ${data.humanTime} <i class="fa fa-check" aria-hidden="true"></i>
                    </div>
                </div>`);
              }
            }

            else{
              $('.layout .content .chat .chat-body .messages').append(`
                <div class="message-item">
                    <div class="message-content">
                        ${mess.text}
                    </div>
                    <div class="message-action">
                        ${data.humanTime}
                    </div>
                </div>`);
            }

            // cuộn chuột xuống cuối 
            $("#modal-chat-person").find("input.form-control").val("");
            let heightDivMess =  $('#modal-chat-person .chat-body .message-item').outerHeight();
            let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;
            $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage);
          })

        }
      },
      error: function(error) {
        $("#modal-chat-person .chat-body .messages").empty();
      }
    })
  });
  
}

$(document).ready(function() {
  openModalChat();
  
});