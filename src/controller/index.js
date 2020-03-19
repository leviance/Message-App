import authController from './authController';
import {homeController} from './homeController';
import contactController from './contactController';
import userController from './userController';
import notifController from './notifController';
import groupController from './groupController';

module.exports.auth = authController;
module.exports.home = homeController;
module.exports.contact = contactController;
module.exports.user = userController;
module.exports.notif = notifController;
module.exports.group = groupController;