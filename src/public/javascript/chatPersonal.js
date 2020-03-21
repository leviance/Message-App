function sendPersonalMess(){
  $(".layout .content .chat .chat-footer form").on("submit",function(){
    let input = $(this).find('input[type=text]');
    let message = input.val();
    message = $.trim(message);
    
    if(!message) return;

    let receiver = {
      id : $(this).parents("#modal-chat-person").attr("data-uid"),
      username: $("#content-chat-person-name").html(),
      avatar: $("#content-chat-person-avatar").attr("src"),
    }

    let sender = {
      id : $("#editProfileModal").attr("data-uid"),
      username: $("#editProfileModal").find("input[name=username]").attr("placeholder"),
      avatar: $("#userAvatar").attr("src"),
    }

    $.ajax({
      url: "/send-personal-message",
      type: "POST",
      data: {message,receiver: receiver, sender: sender},
      success: function(){
        appendPersonalMessageToModal(message);
      },
      error: function(error){
        appendPersonalMessageToModal(message,error);
      }

    })
    
  })
}

function appendPersonalMessageToModal(message,error){
  if(!error){
    $('.layout .content .chat .chat-body .messages').append(`
    <div class="message-item outgoing-message">
        <div class="message-content">
            ${message}
        </div>
        <div class="message-action">
            ${new Date().getHours()} : ${new Date().getMinutes()} <i class="fa fa-check" aria-hidden="true"></i>
        </div>
    </div>`);
  }

  if(error){
    $('.layout .content .chat .chat-body .messages').append(`
      <div class="message-item outgoing-message">
          <div class="message-content">
              ${message}
          </div>
          <div class="message-action">
          ${new Date().getHours()} : ${new Date().getMinutes()} <i title="Message could not be sent" class="ti-info-alt text-danger"></i>
          </div>
      </div>`);
  }

  $("#modal-chat-person").find("input.form-control").val("");

  let heightDivMess =  $('#modal-chat-person .chat-body .message-item').outerHeight();
  let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;

  $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage);
}

$(document).ready(function(){
  sendPersonalMess();
})