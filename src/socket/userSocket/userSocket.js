import _ from 'lodash';

let listSocket = {};

let userSocket = (io) => {
  io.on('connection', socket => {
    let userId;
    socket.on('userId', data =>{
      // dùng đệ lọc những socket id đã disconnected 
      userId = data.userId;
      
      // nếu  có danh sách socket id của userId thì đẩy nó vào trong mảng 
      if(listSocket[userId]){
        listSocket[userId].push(socket.id);
      }
      // nếu chưa có danh sách socket id của userId thì tạo mới
      else {  
        listSocket[userId] = [socket.id];
      }

    });

    // lọc những socket id đã disconnected ra khỏi mảng 
    socket.on('disconnect', () =>{

        _.remove(listSocket[userId], function(socketId) {
        return socketId === socket.id;
        });

        if(listSocket[userId] === []) delete listSocket[userId];

    });

  });
}

module.exports.userSocket = userSocket;
module.exports.listSocket = listSocket;