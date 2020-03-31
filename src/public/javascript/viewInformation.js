function viewInformation(){
  $(".dropdown-item").on("click", function(){
    // information group
    let optionId = $(this).attr("data-uid");
    let modalChatId = $("#modal-chat").attr("data-uid");


    if(optionId === modalChatId){
      let typeToGetInfor = $("#modal-chat").attr("data-type");
      // get group infor
      if(typeToGetInfor === "chat-group"){
        modelGetInformationGroup($(this));
      }

      // get personal infor
      else{
        modelGetInformationPersonal($(this));
      }
      
    }
    
    // information personal
    else{
      modelGetInformationPersonal($(this));
    }
    
  })

  $(".sub_mess_avatar").unbind("click").on("click", function(){
    modelGetInformationPersonal($(this));
  })
}

function modelGetInformationPersonal(tagToGetData){
  let userId = tagToGetData.attr("data-uid");
  let type = tagToGetData.attr("data-navigation-target");

    if(type === "contact-information"){
      loadingModal.show();
      $.ajax({
        url: `/view-user-information-${userId}`,
        type: "get",
        success: function(user){
          if(user.class === null) user.class = "Chưa cập nhật thông tin !";
          if(user.about === null) user.about = "Chưa cập nhật thông tin !";
          if(user.phoneNumber === null) user.phoneNumber = "Chưa cập nhật thông tin !";
          if(user.address === null) user.address = "Chưa cập nhật thông tin !";
          if(user.website === null) user.website = "Chưa cập nhật thông tin !";

          let dataToAppend = modelInformationPersonalToAppend(user.avatar,user.username,user.class,user.about,user.phoneNumber,user.address,user.website,user.linkSocial.facebook,user.linkSocial.instagram)

          $("#contact-information .sidebar-body").empty().append(dataToAppend);

          $("#view-user-infor-images").empty();
          if(user.images.length === 0) $("#view-user-infor-images").append(`
            <li class="list-inline-item">
                <a href="#">
                    <figure class="avatar avatar-lg">
                        <img src="image/userImages/${user.avatar}">
                    </figure>
                </a>
            </li>`);
          else {
            user.images.forEach(image =>{
              $("#view-user-infor-images").append(`
                <li class="list-inline-item">
                    <a href="#">
                        <figure class="avatar avatar-lg">
                            <img src="image/userImages/${image}">
                        </figure>
                    </a>
                </li>`);
            });
          }

          loadingModal.hide();
        },
        error(error){
          loadingModal.hide();
        }
      })
    }
}

function modelGetInformationGroup(tagToGetData){
  let groupId = tagToGetData.attr("data-uid");
  let type = tagToGetData.attr("data-navigation-target");

  if(type === "contact-information"){
    loadingModal.show();
    $.ajax({
      url: `/view-group-information-${groupId}`,
      type: "get",
      success: function(data){
        let avatar = data.avatar;
        let userCreatedName = data.userCreated.username;
        let userCreatedAvatar = data.userCreated.avatar;
        let groupName = data.groupName;
        let amountMembers = data.userAmount;
        let description = data.description;
        let dateOfGroup = `${new Date(data.createdAt).getDate()} : ${new Date(data.createdAt).getMonth()} : ${new Date(data.createdAt).getFullYear()}`;
        
        // găns dữ liệu được load từ sever vào modal 
        let dataToAppend = modelInformationGroupToAppend(avatar,userCreatedName,userCreatedAvatar,groupName,amountMembers,description,dateOfGroup)
        $("#contact-information .sidebar-body").empty().append(dataToAppend);


        // load ra thoogn tin của tất cả thành viên trong nhóm 
        $("#view-infor-all-of-members").empty();
        data.members.forEach( member => {
          $("#view-infor-all-of-members").append(`
            <li>
              <img src="/image/userImages/${member.avatar}" alt="">
              <p><strong>${member.username}</strong></p>
            </li>`)
        })

        loadingModal.hide();
      },
      error(){
        loadingModal.hide();
      }
    })
  }
}

function modelInformationPersonalToAppend(avatar,username,Class,about,phoneNumber,address,website,linkFacebook,linkInstagram){
  return `
          <div class="pl-4 pr-4 text-center">
              <figure class="avatar avatar-state-danger avatar-xl mb-4">
                  <img id="view-user-infor-avatar" src="image/userImages/${avatar}" class="rounded-circle">
              </figure>
              <h5 id="view-user-infor-name" class="text-primary">${username}</h5>
              <p id="view-user-infor-class" class="text-muted">${Class}</p>
          </div>
          <hr>
          <div class="pl-4 pr-4">
              <h6>Giới thiệu</h6>
              <p id="view-user-infor-about" class="text-muted">${about}</p>
          </div>
          <hr>
          <div class="pl-4 pr-4">
              <h6>Số điện thoại</h6>
              <p id="view-user-infor-phoneNumber" class="text-muted">${phoneNumber}</p>
          </div>
          <hr>
          <div class="pl-4 pr-4">
              <h6>Ảnh</h6>
              <div class="files">
                  <ul id="view-user-infor-images" class="list-inline"> 
                      
                  </ul>
              </div>
          </div>
          <hr>
          <div class="pl-4 pr-4">
              <h6>Địa chỉ</h6>
              <p id="view-user-infor-address" class="text-muted">${address}</p>
          </div>
          <hr>
          <div class="pl-4 pr-4">
              <h6>Website</h6>
              <p>
                  <a id="view-user-infor-website" href="#">${website}</a>
              </p>
          </div>
          <hr>
          <div class="pl-4 pr-4">
              <h6>Liên kết </h6>
              <ul class="list-inline social-links">
                  <li class="list-inline-item">
                      <a id="view-user-infor-facebook" href="${linkFacebook}" class="btn btn-sm btn-floating btn-facebook">
                          <i class="fa fa-facebook"></i>
                      </a>
                  </li>
                  <li class="list-inline-item">
                        <a id="view-user-infor-instagram" href="${linkInstagram}" class="btn btn-sm btn-floating btn-instagram">
                            <i class="fa fa-instagram"></i>
                        </a>
                    </li>
                  <li class="list-inline-item">
                      <a href="#" class="btn btn-sm btn-floating btn-twitter">
                          <i class="fa fa-twitter"></i>
                      </a>
                  </li>
                  <li class="list-inline-item">
                      <a href="#" class="btn btn-sm btn-floating btn-dribbble">
                          <i class="fa fa-dribbble"></i>
                      </a>
                  </li>
                  <li class="list-inline-item">
                      <a href="#" class="btn btn-sm btn-floating btn-whatsapp">
                          <i class="fa fa-whatsapp"></i>
                      </a>
                  </li>
                  <li class="list-inline-item">
                      <a href="#" class="btn btn-sm btn-floating btn-linkedin">
                          <i class="fa fa-linkedin"></i>
                      </a>
                  </li>
                  <li class="list-inline-item">
                      <a href="#" class="btn btn-sm btn-floating btn-google">
                          <i class="fa fa-google"></i>
                      </a>
                  </li>
                  <li class="list-inline-item">
                      <a href="#" class="btn btn-sm btn-floating btn-behance">
                          <i class="fa fa-behance"></i>
                      </a>
                  </li>
              </ul>
          </div>
          <hr>
          <div class="pl-4 pr-4">
              <div class="form-group">
                  <div class="form-item custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="customSwitch11">
                      <label class="custom-control-label" for="customSwitch11">Block</label>
                  </div>
              </div>
              <div class="form-group">
                  <div class="form-item custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" checked="" id="customSwitch12">
                      <label class="custom-control-label" for="customSwitch12">Mute</label>
                  </div>
              </div>
              <div class="form-group">
                  <div class="form-item custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="customSwitch13">
                      <label class="custom-control-label" for="customSwitch13">Get notification</label>
                  </div>
              </div>
          </div>`
}

function modelInformationGroupToAppend(avatar,userCreatedName,userCreatedAvatar,groupName,amountMembers,description,dateOfGroup){
  return `
    <div class="pl-4 pr-4 text-center">
    <figure class="avatar avatar-state-danger avatar-xl mb-4">
        <img src="image/userImages/${avatar}" class="rounded-circle"">
    </figure>
    <h5 class="text-primary">${groupName}</h5>
    <p class="text-muted">${description}</p>
      </div>
      <hr>
      <div class="pl-4 pr-4 group-leader-infor">
        <h6>Trưởng nhóm : </h6>
        <img src="/image/userImages/${userCreatedAvatar}" alt="">
        <h5>${userCreatedName}</h5>
      </div>
      <hr>
      <div class="pl-4 pr-4">
        <h6>Ngày thành lập</h6>
        <p class="text-muted"> ${dateOfGroup} </p>
      </div>
      <hr>
      <div class="pl-4 pr-4 group-members-infor">
      <h6>Thành viên ${amountMembers} : </h6>
      <div class="user">
    <ul id="view-infor-all-of-members"> 
    </ul>
      </div>
      </div>
      <hr>
      <div class="pl-4 pr-4">
        <h6>Ảnh</h6>
        <div>
            <ul class="group-image-share"> 
              
            </ul>
        </div>
      </div>
      <hr>
      <div class="pl-4 pr-4 group-files-share">
        <h6>File</h6>
        
      </div>
      <hr>
      <div class="pl-4 pr-4">
        <div class="form-group">
            <div class="form-item custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch11">
                <label class="custom-control-label" for="customSwitch11">Block</label>
            </div>
        </div>
        <div class="form-group">
            <div class="form-item custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" checked="" id="customSwitch12">
                <label class="custom-control-label" for="customSwitch12">Mute</label>
            </div>
        </div>
        <div class="form-group">
            <div class="form-item custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch13">
                <label class="custom-control-label" for="customSwitch13">Get notification</label>
            </div>
        </div>
      </div>`
}