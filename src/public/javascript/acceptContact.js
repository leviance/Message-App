let btnAcceptContact = $("#btn-accept-contact");

function acceptContact(){
  let targetId = btnAcceptContact.attr("data-uid");
  
  $.ajax({
    url: `/accept-contact-${targetId}`,
    type: "put"
  });

  // handle real time affter 

}

$(document).ready(function(){
  btnAcceptContact.on("click", function(){
    acceptContact();
  })
  

  // handle real time affter 
})