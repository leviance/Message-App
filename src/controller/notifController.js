import {notification} from '../services/index';

let notificationViewed = (req, res) => {
  let listNotifUnread = req.body.listNotifUnread;
  notification.notificationViewed(listNotifUnread);
}

let readMoreNotifications = async (req, res) => {
  let skip = req.body.amountNotif;
  skip = Number(skip);

  let userId = req.session.user.userId;
  
  try {
    let notif = await notification.readMoreNotifications(userId,skip);

    return res.status(200).send(notif);
  } catch (error) {
    return res.status(500).send(error);
  }
}

let removeAllNotifications = (req, res) => {
  notification.removeAllNotifications(req.params.targetId);
}

module.exports = {
  notificationViewed: notificationViewed,
  readMoreNotifications: readMoreNotifications,
  removeAllNotifications: removeAllNotifications
}