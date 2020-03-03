// về sau sẽ tự làm thuật toán tìm kiếm tối ưu hơn phương thức của mongo
let regexSearchFriends = (userName) =>{
  // chuyển đổi chuỗi thành cả in hoa và in thường thành một chuỗi regex để đối chiếu trong database
  userName = userName.toLowerCase();
  userName = userName + userName.toUpperCase();

  let regex = new RegExp(`[${userName}]`,"g");

  return regex;
}

module.exports = {
  regexSearchFriends: regexSearchFriends
}