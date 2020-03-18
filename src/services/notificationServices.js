import NotificationModal from '../models/notificationModel';
import timeSince from '../helper/timeSince';

const LIMIT_NOTIF_TAKEN = 8;

let getListNotifications = (userId) => {
  return new Promise( async (resolve, reject) => {
    let listNotifications = await NotificationModal.getListNotifications(userId, LIMIT_NOTIF_TAKEN);

    listNotifications.forEach(notification => {
      notification.time = timeSince(notification.createdAt);
    });
    
    return resolve(listNotifications);
  })
}

let notificationViewed = (listNotifUnread) => {
  NotificationModal.tickReaded(listNotifUnread);
}

let readMoreNotifications = (userId, skip) => {
  return new Promise( async (resolve, reject) => {
    let listNotifications = await NotificationModal.getMore(userId,skip,LIMIT_NOTIF_TAKEN);

    let dataToReturn = {};
    let listDataToReturn = [];

    listNotifications.forEach(notification => {
      dataToReturn.time = timeSince(notification.createdAt);
      dataToReturn.id = notification._id;
      dataToReturn.senderAvatar = notification.senderNotif.avatar;
      dataToReturn.content = notification.content;
      dataToReturn.isRead = notification.isRead;

      listDataToReturn.push(dataToReturn);
    });

    if(listNotifications.length === 0) return reject();
    
    return resolve(listDataToReturn);

  })
}

module.exports = {
  getListNotifications: getListNotifications,
  notificationViewed: notificationViewed,
  readMoreNotifications: readMoreNotifications
}