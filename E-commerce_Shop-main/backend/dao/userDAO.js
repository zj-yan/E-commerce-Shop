import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let usersInfo;

export default class UsersDAO {
  static async injectDB(conn) {
    if (usersInfo) {
      return;
    }
    try {
      usersInfo = await conn
        .db(process.env.PRODUCTREVIEWS_NS)
        .collection('userInfos');
    } catch (e) {
      console.error(`Unable to connect in UsersDAO: ${e}`);
    }
    // console.log(users);
  }

  static async checkUser(username, passWord) {
    let cursor;
    try {
      console.log('checkUser name = ' + username);
      console.log('checkUser password = ' + passWord);

      // if(users){
      //    console.log("connect in UsersDAO");
      // }
      // else{
      //     console.log("not connect in UsersDAO");
      // }
      cursor = await usersInfo.find({
        userName: username,
      });
      console.log('checkUser password = ' + console.log(usersInfo));
      if (cursor == null) {
        return false;
      }
      const info = await cursor.toArray();
      // console.log("cursor = ");
      // console.log(info);
      // console.log(info[0].password);
      if (info[0].password != passWord) {
        return false;
      }

      return true;
    } catch (e) {
      console.error(
        `Something went wrong in checkUser: ${e}, the user is not in the database`
      );
      throw e;
    }
  }

  static async getInfo(username) {
    let cursor;
    try {
      cursor = await usersInfo.find({
        userName: username,
      });
      const info = await cursor.toArray();
      return info[0];
    } catch (e) {
      console.error(`Something went wrong in user getInfo: ${e}`);
      throw e;
    }
  }

  static async signUp(username, passWord) {
    try {
      const userInfo = {
        userName: username,
        password: passWord,
      };
      let count = await usersInfo
        .find({
          userName: username,
        })
        .count();
      //console.log("count = " + count);
      if (count == 0) {
        return await usersInfo.insert(userInfo);
      } else {
        return { error: 'user name already exist' };
      }
    } catch (e) {
      console.error(`Something went wrong in user getInfo: ${e}`);
      return { error: e };
    }
  }
}
