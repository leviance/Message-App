function getMessages(){
  // có gì sai thì thêm unbind vào đây 
  $(".click-to-chats").unbind("click").on("click", function(){

    let receiverMessId = $(this).attr("data-uid");
    //let senderMessId = $("#editProfileModal").attr("data-uid");
    let type = $(this).attr("data-type");
    let avatar = $(this).find("img").attr("src");
    let username = $(this).find("h5").html();
    
    if(!type) type = "chat-personal";

    // thay đổi thông tin của modal-chat
    $("#modal-chat").attr("data-uid",receiverMessId);
    $("#modal-chat").find("img").attr("src",avatar);
    $("#content-chat-person-name").html(username);
    $("#modal-chat").attr("data-type",type);

    // thêm id vào tùy chọn ở drop down menu
    let options =  document.querySelectorAll("#modal-chat li.list-inline-item .dropdown-menu a");
    options.forEach( option => {
      option.dataset.uid = receiverMessId;
    })

    $("#modal-chat .chat-body .messages").empty();

    $.ajax({
      url: "/get-messages",
      type: "POST",
      data: {receiverMessId, type},
      success: function(data) {
        console.log(data);
        if(data.length === 0) {
          $("#modal-chat .chat-body .messages").empty();
        }

        else{
          let senderId = $("#editProfileModal").attr("data-uid");

          data.forEach( (mess,last,i) => {
            // nếu tin nhắn là mình gửi 
            if(mess.sender.id === senderId){
              // tin Nhắn mới nhất thì hiện ký hiệu đã xem hay chưa 
              if(last === data.length - 1){
                // nếu đã xem
                if(mess.isRead === true ){
                  $('.layout .content .chat .chat-body .messages').append(`
                  <div class="message-item outgoing-message" title="${mess.time}">
                      <div class="message-content">${mess.text}</div>
                      <div class="message-action">
                          ${mess.time} <i class="ti-double-check"></i>
                      </div>
                  </div>`);
                }
                // nếu chưa xem 
                else{
                  $('.layout .content .chat .chat-body .messages').append(`
                  <div class="message-item outgoing-message" title="${mess.time}">
                      <div class="message-content">${mess.text}</div>
                      <div class="message-action">
                          ${mess.time} <i class="fa fa-check" aria-hidden="true"></i>
                      </div>
                  </div>`);
                }
              }

              // những tin nhắn khác thì để time trong title
              else{
                $('.layout .content .chat .chat-body .messages').append(`
                  <div class="message-item outgoing-message" title=" ${mess.time}">
                      <div class="message-content">${mess.text}</div>
                      <div class="message-action">
                      </div>
                  </div>`);
              }
            }

            // nếu tin nhắn là người khác gửi đến 
            else{
              // nếu tin nhắn ở trong nhóm thì thêm avatar người gửi vào 
              if(mess.type === "chat-group"){
                  $('.layout .content .chat .chat-body .messages').append(`
                    <div class="message-item" title="${mess.time}">
                        <div class="message-content">${mess.text}</div>
                        <img data-uid="${mess.sender.id}" title="${mess.sender.username}" class="sub_mess_avatar" src="${mess.sender.avatar}" data-navigation-target="contact-information"></img>
                    </div>`);
                  viewInformation();
              }

              // nếu không phải tin nhắn trong nhóm thì không cần thêm avatar
              else{
                $('.layout .content .chat .chat-body .messages').append(`
                  <div class="message-item" title="${mess.time}">
                      <div class="message-content">${mess.text}</div>
                      <div class="message-action">
                          
                      </div>
                  </div>`);
              }
            }

            // cuộn chuột xuống cuối 
            $("#modal-chat").find("input.form-control").val("");
            let heightDivMess =  $('#modal-chat .chat-body .message-item').outerHeight();
            let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;
            $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage *200);
          })
        }

        // xử  lý tin nhắn đã xem real time 
        if(type === "chat-personal"){
          messagePersionalViewed(receiverMessId);
        }
      },
      error: function(error) {
        $("#modal-chat .chat-body .messages").empty();
      }
    });

     // bỏ count new messages when click to a conversation
     let isThereNewMessage = $(this).find(".new-message-count");

     //  nếu conversation có symbol new mesage 
     if(isThereNewMessage.length > 0){
       let conversationId = $(this).attr("data-uid");
       removeNewMessCount(conversationId);
     }

     tickMessActive($(this));
     
  });
}

function sendMessageText(){
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

    let typeChat = $("#modal-chat").attr("data-type");

    // gửi tin nhắn cá nhân
    if(typeChat == "chat-personal"){
      $.ajax({
        url: "/send-personal-message",
        type: "POST",
        data: {message,receiver: receiver, sender: sender},
        success: function(){
          // xóa timeStamp ở tin nhắn trước nó 
          $("#modal-chat .messages div:last-child").find(".message-action").remove();

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
  
          showMessSendInSymbolChat(message,receiver.id)
          moveConversationToTop(receiver.id);
        },
        error: function(error){
          appendPersonalMessageToModal(message,error);
        }
  
        });
    }
      
    // gửi tin nhắn nhóm
    else{
      $.ajax({
        url: "/send-group-message",
        type: "POST",
        data: {message,receiver: receiver, sender: sender},
        success: function(data){
          // xóa timeStamp ở tin nhắn trước nó 
          $("#modal-chat .messages div:last-child").find(".message-action").remove();

          appendPersonalMessageToModal(message);
    
          let receiverId = [];
          data.members.forEach(function(memberId){
            if(memberId !== sender.id){
              receiverId.push(memberId);
            }
          })
          
          // send message real time
          dataToEmit = {
            groupId: data._id,
            senderId : sender.id,
            receiverId : receiverId,
            username : sender.username,
            avatar : sender.avatar,
            message: message
          }
          
          socket.emit("send-group-message-text", dataToEmit);
  
          showMessSendInSymbolChat(message,receiver.id)
          moveConversationToTop(receiver.id);
        },
        error: function(error){
          appendPersonalMessageToModal(message,error);
        }
  
        });
    }
    

    // xem chats slide bar đã có conversation chưa nếu chưa có thì thêm vào
    let findConversation =  $("#chats .sidebar-body ul").find(`li[data-uid=${receiver.id}]`);
    if(findConversation.length === 0){
      $("#chats .sidebar-body ul").prepend(modelConversationToAppendChatsSlideBarWhenSendNewMessage(receiver.id,receiver.avatar,message,receiver.username));
    }
    
    removeAmountMessNotRead();
    viewInformation();
    getMessages();

  })
}

function receiveMessageGroup(){
  socket.on("response-send-group-message-text", data => {
    let scrollModal = scrollToNewMessage();
    let idModalChatOpen = $("#modal-chat").attr("data-uid");

    // nếu modal chat đó đang mở 
    if(data.groupId === idModalChatOpen){
      // xóa timeStamp ở tin nhắn trước nó 
      $("#modal-chat .messages div:last-child").find(".message-action").remove();

      $("#modal-chat .chat-body .messages").append(`
        <div class="message-item">
            <div class="message-content">
                ${data.message}
            </div>
            <img data-uid="${data.senderId}" title="${data.username}" class="sub_mess_avatar" src="${data.avatar}" data-navigation-target="contact-information"></img>
            <div class="message-action">
              ${new Date().getHours()}h : ${new Date().getMinutes()}p : ${new Date().getSeconds()}s
            </div>
        </div>`);

        let symbolConversation = $("#list-messages").find(`li[data-uid=${data.groupId}]`);
        symbolConversation.find("p").html(`${data.username} : ${data.message}`);
    }

    // nếu không thì thêm tin nhắn vào phần sub conversation 
    else{
      let symbolConversation = $("#list-messages").find(`li[data-uid=${data.groupId}]`);
      symbolConversation.find("p").html(`${data.username} : ${data.message}`);
    }

    // thêm số tin nhắn chưa xem 
    let isMessThere = $("#chats .sidebar-body ul").find(`li[data-uid=${data.groupId}]`);
    let messageNotRead = 0;
    messageNotRead = isMessThere.find(".new-message-count").html();
   
    if(messageNotRead){
      isMessThere.find(".new-message-count").html(Number(messageNotRead) + 1);
    }
    
    else{
      let messageToAddAmountMessNotRead = $("#chats .sidebar-body ul").find(`li[data-uid=${data.groupId}]`);
      messageToAddAmountMessNotRead.find(".users-list-action").removeClass("action-toggle").empty();
      messageToAddAmountMessNotRead.find(".users-list-action").append(`<div class="new-message-count">1</div>`);
    }

    $("#btn-view-list-chat").addClass("notifiy_badge");

    if(scrollModal === true) {
      // chuột xuống cuối 
      let heightDivMess =  $('#modal-chat .chat-body .message-item').outerHeight();
      let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;

      $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage *200);
    }
    
    // những cái này để xóa hiển thị số những tin nhắn chưa đọc của user khi submit modal chát của user đó 
    removeAmountMessNotRead();
    getMessages();
    viewInformation();
    moveConversationToTop(data.groupId);
  })
}

function receiveMessageText(){
  socket.on("response-send-message-text", data => {
    let scrollModal = scrollToNewMessage();
    let senderId = data.senderId
        ,avatar = data.avatar
        ,message = data.message
        ,username = data.username
        ,messageText = data.message

    // append message to modal chat
    let curentlyUserChatId = $("#modal-chat").attr("data-uid");
    if(senderId === curentlyUserChatId){
      // xóa timeStamp ở tin nhắn trước nó 
      $("#modal-chat .messages div:last-child").find(".message-action").remove();

      $("#modal-chat .chat-body .messages").append(`
      <div class="message-item">
          <div class="message-content">${messageText}</div>
          <div class="message-action">
          Vừa xong
          </div>
      </div>`);
    }

    // nếu chưa có biểu tượng tin nhắn ở đấy thì thêm vào
    let isMessThere = $("#chats .sidebar-body ul").find(`li[data-uid=${senderId}]`);

    if(isMessThere.length === 0){
      $("#chats .sidebar-body ul").prepend(modelConversationToAppendChatsSlideBar(senderId,avatar,message,username));
    }
    
    // nếu có biểu tượng tin nhắn rồi thì thay đổi sub tin nhắn của biểu tượng 
    else{
      isMessThere.find("p").html(`${message}`);
    }

    // thêm số tin nhắn chưa xem 
    let messageNotRead = 0;
    messageNotRead = isMessThere.find(".new-message-count").html();
   
    if(messageNotRead){
      isMessThere.find(".new-message-count").html(Number(messageNotRead) + 1);
    }
    
    else{
      let messageToAddAmountMessNotRead = $("#chats .sidebar-body ul").find(`li[data-uid=${senderId}]`);
      messageToAddAmountMessNotRead.find(".users-list-action").removeClass("action-toggle").empty();
      messageToAddAmountMessNotRead.find(".users-list-action").append(`<div class="new-message-count">1</div>`);
    }

    $("#btn-view-list-chat").addClass("notifiy_badge");

    // những cái này để xóa hiển thị số những tin nhắn chưa đọc của user khi submit modal chát của user đó 
    removeAmountMessNotRead();
    getMessages();
    
    console.log(scrollModal);
    if(scrollModal === true) {
      // chuột xuống cuối 
      let heightDivMess =  $('#modal-chat .chat-body .message-item').outerHeight();
      let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;

      $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage *200);
    }
  });
}

function appendPersonalMessageToModal(message,error){
  if(!error){
    $('.layout .content .chat .chat-body .messages').append(`
    <div class="message-item outgoing-message">
        <div class="message-content">
            ${message}
        </div>
        <div class="message-action">
        Vừa xong <i class="fa fa-check" aria-hidden="true"></i>
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
          Vừa xong <i title="Message could not be sent" class="ti-info-alt text-danger"></i>
          </div>
      </div>`);
  }

  $("#modal-chat").find("input.form-control").val("");

  let heightDivMess =  $('#modal-chat .chat-body .message-item').outerHeight();
  let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;

  $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage *200);
}

// appen when send a new mesage 
function modelConversationToAppendChatsSlideBarWhenSendNewMessage(senderId,avatar,message,username){
  return `
  <li class="list-group-item click-to-chats" data-uid="${senderId}" data-type="chat-personal">
      <div class="avatar-group">
          <figure class="avatar">
              <img src="${avatar}" class="rounded-circle">
              </span>
          </figure>
      </div>
      <div class="users-list-body">
          <h5>${username}</h5>
          <p>${message}</p>
          <div class="users-list-action action-toggle">
              <div class="dropdown">
                <a data-toggle="dropdown" href="#">
                    <i class="ti-more"></i>
                </a>
                <div class="dropdown-menu dropdown-menu-right" >
                    <a href="#" data-uid="${senderId}" data-navigation-target="contact-information" class="dropdown-item">Xem hồ sơ</a>
                    <a href="#" data-uid="${senderId}" class="dropdown-item">Thêm vào liên hệ yêu thích</a>
                    <a href="#" data-uid="${senderId}" class="dropdown-item">Xóa tin nhắn</a>
                    <a href="#" data-uid="${senderId}" class="dropdown-item">Chặn người dùng</a>
                </div>
              </div>
          </div>
      </div>
  </li>`;
}

// append when received new message
function modelConversationToAppendChatsSlideBar(senderId,avatar,message,username){
  return `
  <li class="list-group-item click-to-chats" data-uid="${senderId}" data-type="chat-personal">
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

function removeNewMessCount(messId){
  // khi click vào những tin nhắn chưa xem xóa hiển thị những tin nhắn chưa xem thay vào là các tùy chọn
  let messageToRemoveCountNewMess = $("#chats .sidebar-body ul").find(`li[data-uid=${messId}]`);

  let haveDropMenu = $(messageToRemoveCountNewMess).find(".dropdown");

  if(haveDropMenu.length === 0) {
    $(messageToRemoveCountNewMess).find('.new-message-count').remove();
    $(messageToRemoveCountNewMess).find('.users-list-action').addClass("action-toggle");
    $(messageToRemoveCountNewMess).find('.users-list-action').append(`
    <div class="dropdown">
      <a data-toggle="dropdown" href="#">
          <i class="ti-more"></i>
      </a>
      <div class="dropdown-menu dropdown-menu-right">
          <a href="#" data-uid="${messId}" data-navigation-target="contact-information" class="dropdown-item">Xem hồ sơ</a>
          <a href="#" data-uid="${messId}" class="dropdown-item">Thêm vào liên hệ yêu thích</a>
          <a href="#" data-uid="${messId}" class="dropdown-item">Xóa tin nhắn</a>
          <a href="#" data-uid="${messId}" class="dropdown-item">Chặn người dùng</a>
      </div>
    </div>`);

    // tìm xem còn tin nhắn chưa đọc không nếu không thì bỏ chấm đỏ khỏi biểu tượng thông báo
    let newMessage = $("#chats .sidebar-body ul li").find(".new-message-count");

    if(newMessage.length === 0){
      $("#btn-view-list-chat").removeClass("notifiy_badge");
    }
    
    viewInformation();
  }

}

// thêm hiển thị tin nhắn ở phần biểu tượng chat của mình khi gửi tin nhăn cho người khác
function showMessSendInSymbolChat(message,id){
  let symbolMessage = $("#chats .sidebar-body ul").find(`li[data-uid=${id}]`);
  symbolMessage.find("p").html(message);
}

// khi nhắn tin tin thì di chuyển symbol conversation đó lên đầu 
function moveConversationToTop(id){
  let conversationToMoveTop = $("#chats .sidebar-body ul").find(`li[data-uid=${id}]`);
  $("#chats .sidebar-body ul").find(`li[data-uid=${id}]`).remove();

  $("#chats .sidebar-body ul").prepend(conversationToMoveTop);

  viewInformation();
  getMessages();
  removeAmountMessNotRead();
  getMessages()
  tickReadNotif();
  removeNotifWhenAcceptContact();
}

// cuộn chuột xuống cuối khi có tin nhắn mới đến nếu đang cuộn ở dưới cùng nếu không thì không cuộn xuống
function scrollToNewMessage(){
  let heightScrollBarModalChat = document.querySelector(".messages").scrollHeight;
  let locationOfScrollBar = $(".messages").scrollTop();
  let heightModal = $(".messages").height();
  
  // nếu người dùng đang cuộn chuột ở cuối trang thì kéo xuống  
  // còn không thì là người dùng đang xem tin nhẵn cũ nên không cuộn xuống 
 if(locationOfScrollBar + heightModal === heightScrollBarModalChat ) return true;

 return false;
}

$(document).ready(function() {
  // khi click vào tin nhắn nào thì bỏ amount message not read
  $("#chats .sidebar-body ul li").on("click", function(){
    removeNewMessCount($(this).attr("data-uid"));
  })

  getMessages();

  sendMessageText();

  receiveMessageText();

  receiveMessageGroup();
  
});
