// về sau sẽ tự làm thuật toán tìm kiếm tối ưu hơn phương thức của mongo
let regexSearchFriends = (userName) =>{
  // chuyển đổi chuỗi thành cả in hoa và in thường thành một chuỗi regex để đối chiếu trong database
  userName = userName.toLowerCase();
  userName = userName + userName.toUpperCase();

  let regex = new RegExp(`[${userName}]`,"g");

  return regex;
}

let removeExtraWhitespace = (name) => {
 return new Promise( (resolve, reject) => {
  let j = 0;
  let newName = "";
  let a = 0;
  if(name[0]===" "){ a = 1 }
  for(let i = 0 ; i < name.length ; i++){
    if(a === 1){
      if(name[i] !== " "){ 
        a = 0;
      }
    }

    if(a === 0){

      if(name[i] === " "){
        if(j == 0){
            newName = newName + name[i];
            j = 1;
        }
        if(j == 1){
            continue;
        }
    }
    else{  j = 0  }
    newName = newName + name[i];

    }
  }

  return resolve(newName);
 })
} 

module.exports = {
  regexSearchFriends: regexSearchFriends,
  removeExtraWhitespace: removeExtraWhitespace
}