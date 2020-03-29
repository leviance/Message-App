function timeSince(date) {
  let timeStamp = new Date(date);

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return `Ngày ${timeStamp.getDate()} Tháng ${timeStamp.getMonth()} Năm ${timeStamp.getYear()}`;
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return `Ngày ${timeStamp.getDate()} Tháng ${timeStamp.getMonth()} lúc ${timeStamp.getHours()}H`;
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return `Ngày ${timeStamp.getDate()} lúc ${timeStamp.getHours()} : ${timeStamp.getMinutes()}`;
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    if(timeStamp.getDay() === 0){
      return `Chủ nhật lúc ${timeStamp.getHours()}h : ${timeStamp.getMinutes()}p`;
    }
    return `Thứ ${timeStamp.getDay()} lúc ${timeStamp.getHours()}h : ${timeStamp.getMinutes()}p`;
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return `${timeStamp.getHours()}h : ${timeStamp.getMinutes()}p : ${timeStamp.getSeconds()}s`;
  }
  return `${timeStamp.getHours()}h : ${timeStamp.getMinutes()}p : ${timeStamp.getSeconds()}s`;
  
}

module.exports = timeSince