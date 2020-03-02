import {home} from '../services/index';

let searchFriends = async (req,res) => {
    let userName = req.body.userName;
    // let requestUserName = req.body.userName;
    // // loại bỏ các ký tự chữ cái in hoa in thường và tiếng việt để lấy được một chuỗi các ký tự đặc biệt 
    // let regex = new RegExp(/[A-Za-z0-9 âăêưôđơèéẹẻẽỳýỵỹỷểệễềếủũụùúửữựừứỉĩịìíòóỏõọổồốỗộảạãáàẳặẵắằẩẫậấầÂĂÊƯÔĐƠÈÉẸẺẼỲÝỴỸỶỂỆỄỀẾỦŨỤÙÚỬỮỰỪỨỈĨỊÌÍÒÓỎÕỌỔỒỐỖỘẢẠÃÁÀẲẶẴẮẰẨẪẬẤẦ]/g);
    // let specialCharacters = requestUserName.replace(regex,"");

    // // tạo biểu thức từ các ký tự đặc biệt vừa lấy để loại bỏ các ký tự này
    // let newRegex = new RegExp(`[${specialCharacters}]`,"g");

    // // được một chuỗi không có ký tự đặc biệt 
    // let userName = requestUserName.replace(newRegex,"");

    try {
    console.log(userName);

    let searchFriends = await home.searchFriends(userName);
    console.log(searchFriends);
    
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
  
}

module.exports = {
  searchFriends: searchFriends
}
