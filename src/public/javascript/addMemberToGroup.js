function addMemberToGroup(){
  $("#search-friend-to-add-group").unbind("keypress").on("keypress", function(event){
    if(event.which === 13){
      alert("ok");
    }
  })

  $("#btn-search-friend-to-add-group").unbind("click").on("click", function(){
    alert("ok");
  })
}

$(document).ready(function(){
  addMemberToGroup();
})