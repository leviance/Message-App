function sendPersonalMess(){
  $(".layout .content .chat .chat-footer form").on("submit",function(){
    let input = $(this).find('input[type=text]');
    let message = input.val();
    message = $.trim(message);
    
    if(!message) return;

    let receiver = {
      id : $(this).parents("#modal-chat").attr("data-uid"),
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

        // send message real time
        dataToEmit = {
          senderId : sender.id,
          receiverId : receiver.id,
          username : sender.username,
          avatar : sender.avatar,
          message: message
        }

        socket.emit("send-message-text", dataToEmit);
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

  $("#modal-chat").find("input.form-control").val("");

  let heightDivMess =  $('#modal-chat .chat-body .message-item').outerHeight();
  let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;

  $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage);
}

function modelChatAppendModalChats(senderId,avatar,message,username){
  return `
  <li class="list-group-item" data-uid="${senderId}">
      <div class="avatar-group">
          <figure class="avatar">
              <img src="${avatar}" class="rounded-circle">
              </span>
          </figure>
      </div>
      <div class="users-list-body">
          <h5>${username}</h5>
          <p>${message}</p>
          <div class="users-list-action">
              <div class="new-message-count">1</div>
          </div>
      </div>
  </li>`;
}

$(document).ready(function(){
  sendPersonalMess();

  socket.on("response-send-message-text", data => {
    let senderId = data.senderId
        ,avatar = data.avatar
        ,message = data.message
        ,username = data.username;

    let isMessThere = $("#chats .sidebar-body ul").find(`li[data-uid=${senderId}]`);
    console.log(isMessThere);
    // nếu chưa có biểu tượng tin nhắn ở đấy thì thêm vào
    if(isMessThere.length === 0){
      $("#chats .sidebar-body ul").prepend(modelChatAppendModalChats(senderId,avatar,message,username));
    }
    
    // nếu có biểu tượng tin nhắn rồi thì thay đổi sub tin nhắn của biểu tượng 
    else{
      isMessThere.find("p").html(`${message}`);
    }

    // thêm số tin nhắn chưa xem 
    let messageNotRead = + isMessThere.find(".new-message-count").html();
    isMessThere.find(".new-message-count").html(messageNotRead + 1);

  })
})

// LÀM Ở PHẦN VIEW MESSAGE 

// khi click vào những tin nhắn chưa xem xóa hiển thị những tin nhắn chưa xem thay vào là các tùy chọn
{/* <div class="dropdown">
    <a data-toggle="dropdown" href="#">
        <i class="ti-more"></i>
    </a>
    <div class="dropdown-menu dropdown-menu-right">
        <a href="#" data-uid="${senderId}" data-navigation-target="contact-information" class="dropdown-item">Xem hồ sơ</a>
        <a href="#" data-uid="${senderId}" class="dropdown-item">Thêm vào liên hệ yêu thích</a>
        <a href="#" data-uid="${senderId}" class="dropdown-item">Xóa tin nhắn</a>
        <a href="#" data-uid="${senderId}" class="dropdown-item">Chặn người dùng</a>
    </div>
</div> */}