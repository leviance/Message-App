export const transValidation = {
  emailIncorrect: "Email bạn nhập không hợp lệ !",
  usernameIncorrect: "Tên chỉ được sử dụng chữ thường chữ hoa và số  !",
  usernameLengthIncorrect: "Tên phải có tối thiểu 6 và tối đa 30 ký tự !",
  nameAccountIncorrect: "Tên tài khoản không được chứa ký tự đặc biệt!",
  nameAccountLengthIncorrect: "Tên tài khoản phải có tối thiểu 6 và tối đa 30 ký tự ",
  passwordIncorrect: "Mật khẩu chỉ được phép chứa chữ thường chữ hoa và số !",
  passwordLengthIncorrect: "Mật khẩu phải có từ 6 đên 30 ký tự",
  genderIncorrect: "Giới tính không hợp lệ ?? Bạn có phải là một hacker ...",
  dataNoFound: "Không tìm thấy kết quả phù hợp !",
}

export const groupValid = {
  idIsCorrect: "Có chứa ID không hợp lệ vui lòng kiểm tra lại !",
  userAmountIsCorrect: "Cần phải có tối thiểu 3 người để tạo nhóm !",
  groupNameIsCorrect: "Tên nhóm phải có từ 6 đến 45 ký tự! không được chứa ký tự đặc biệt !",
  descriptionIsCorrect: "Giới thiệu nhóm phải có từ 6 đến 100 ký tự! không được chứa ký tự đặc biệt !",
  exeededGroupAllow: "Bạn đã đạt đến số lượng nhóm mỗi người có thể tạo là 10 nhóm !",
  
}

export const groupAction = {
  leaveGroupChat: (username,groupName) => {
    return `${username} đã rời khỏi nhóm ${groupName}.`
  }
}

export const loginRegisterIncorrect = {
  nameAccountExists: "Tài khoản đã tồn tại vui lòng kiểm tra lại !",
  errorUndifine: "Đã có lỗi bất ngờ xảy ra vui lòng liên hệ với bộ phận hỗ trợ của chúng tôi !",
  emailExists: "Email đã tồn tại vui lòng kiểm tra lại !",
  sendMailIncorrect: "Đã có lỗi xảy ra trong quá trinh gửi Email, xin vui lòng kiểm tra lại email, hoặc liên hệ với bộ phận hỗ trợ của chúng tôi !",
  accountIsNotActive: "Tài khoản của bạn chưa được xác thực vui lòng kiểm tra email và làm theo hướng dẫn để kích hoạt tài khoản này !"
}

export const transUpdateUserInfo = {
  avatar_type: "Kiểu file không hợp lệ !",
  updateSuccess: "Cập nhật thông tin tài khoản thành công.",
  errorUpdateAvatar: "Chỉ được upload ảnh và kích thước phải nhỏ hơn 1MB",
  addressIncorrect: "Địa chỉ không được chứa ký tự đẵ biệt chỉ chấp nhận chữ hoa chữ thường và số !",
  addressLengthIncorrect: "Địa chỉ phải trong khoảng từ 6 đến 50 ký tự !",
  phoneNumberIncorrect: "Số điện thoại không đúng !",
  classIncorrect: "Lớp không họp lệ !",
  dataToUpdateEmpty: "Bạn chưa sửa bất cứ thông tin gì !"
}

export const notificationContent = {
  requestContact: (name) =>{
    return `<strong style="color: #3db16b;">${name}</strong> đã gửi cho bạn một lời mời kết bạn.`
  },
  acceptContact: (name) =>{
    return `<strong style="color: #3db16b;">${name}</strong> đã chấp nhận lời mời kết bạn của bạn.`
  }
}

export const notificationType = {
  requestContact: "requestContact",
  acceptContact: "acceptContact"
}