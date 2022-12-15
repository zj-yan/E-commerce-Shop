import { json } from 'express';
import UsersDAO from '../dao/userDAO.js';

export default class UserController {
  static async apiCheckUser(req, res, next) {
    //console.log("Come to apiCheckUser !!");
    try {
      let userName = req.params.userName;
      let password = req.params.password;
      let userValidation = await UsersDAO.checkUser(userName, password);
      console.log('userValidation = ' + userValidation);
      console.log('userValidation = ' + req.params);
      res.json(userValidation);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetUserInfo(req, res, next) {
    try {
      let userName = req.params.userName;

      let info = await UsersDAO.getInfo(userName);
      //console.log("info = " + info);
      res.json(info);
    } catch (e) {
      console.log(`API, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiSignup(req, res, next) {
    console.log('Come to apiSignup !!');
    try {
      let userName = req.body.userName;
      let password = req.body.password;
      let signupResponse = await UsersDAO.signUp(userName, password);
      //console.log("apiSignup signupResponse = " + json.toString(signupResponse));
      var { error } = signupResponse;
      if (error) {
        console.log(error);
        res.status(500).json({ error: error });
      } else {
        res.json({ status: 'success' });
      }
    } catch (e) {
      // console.log(`API, ${e}`);
      res.status(500).json({ error: e.message });
    }
  }
}
