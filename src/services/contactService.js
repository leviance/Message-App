import ContactModel from '../models/contactModel';

let sendRequestContact = async (senderId,receiverId) =>{
  let checkContactExist = await ContactModel.findContact(senderId,receiverId);

  if(checkContactExist === null){
    ContactModel.createNew(senderId,receiverId);
  }
  
}

module.exports = {
  sendRequestContact: sendRequestContact
}