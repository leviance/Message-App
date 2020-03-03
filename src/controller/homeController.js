import {home} from '../services/index';
import _ from 'lodash';

const LIMIT_FRIENDS_TEKEN = 10;

let searchFriends = async (req,res) => {
  let userName = req.body.userName;

  try {
    let searchResults = await home.searchFriends(userName,LIMIT_FRIENDS_TEKEN);

    return res.status(200).send(searchResults);
  } catch (error) {
    return res.status(500).send(error);
  }
}

module.exports = {
  searchFriends: searchFriends
};