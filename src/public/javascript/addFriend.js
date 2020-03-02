function searchFriends(){
  let userName = $("#input-search-friends").val();
  if(userName === "") return;

  $.post(`/search-friend`,{userName : userName},function(data){
    console.log(data);
  }).fail(function(error){
    console.log(error);
  });
}


$(document).ready(function(){
  $("#search-friend").on("click",function(){
    searchFriends();
  })

  $("#addFriends").keypress(function(event){
    if(event.which == 13){
      searchFriends();
    }
  })
});