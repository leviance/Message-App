import authServices from './authServices';
import homeServices from './homeServices';
import contactService from './contactService';
import userServices from './userServices';
import notificationServices from './notificationServices';
import groupServices from './groupServices';

module.exports.auth = authServices;
module.exports.home = homeServices;
module.exports.contact = contactService;
module.exports.user = userServices;
module.exports.notification = notificationServices;
module.exports.group = groupServices;