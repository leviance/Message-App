// $(function () {

//     var ChatosExamle = {
//         Message: {
//             add: function (message, type) {
//                 var chat_body = $('.layout .content .chat .chat-body');
//                 if (chat_body.length > 0) {

//                     type = type ? type : '';
//                     message = message ? message : 'Lorem ipsum dolor sit amet.';

//                     $('.layout .content .chat .chat-body .messages').append('<div class="message-item ' + type + '"><div class="message-content">' + message + '</div><div class="message-action">PM 14:25 ' + (type ? '<i class="ti-check"></i>' : '') + '</div></div>');

//                     let heightDivMess =  $('#modal-chat-person .chat-body .message-item').outerHeight();
//                     let amountMessage = $('.layout .content .chat .chat-body .messages .message-item').length;

//                     $('.layout .content .chat .chat-body .messages').scrollTop(heightDivMess * amountMessage);

                    
//                 }
//             }
//         }
//     };


    

//     $(document).on('submit', '.layout .content .chat .chat-footer form', function (e) {
//         e.preventDefault();

//         var input = $(this).find('input[type=text]');
//         var message = input.val();

//         message = $.trim(message);

//         if (message) {
//             ChatosExamle.Message.add(message, 'outgoing-message');
//             input.val('');
//         } else {
//             input.focus();
//         }
//     });

//     $(document).on('click', '.layout .content .sidebar-group .sidebar .list-group-item', function () {
//         if (jQuery.browser.mobile) {
//             $(this).closest('.sidebar-group').removeClass('mobile-open');
//         }
//     });

// });