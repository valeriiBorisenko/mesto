export default class UserInfo{
  constructor(name, about, avatar){
    this._user = name
    this._about = about
    this._avatar = avatar
  }

  getUserInfo() {
    const info = {
      name: this._user.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
    }
    return info;
  }

  setUserInfo (name, about){
    this._user.textContent = name;
    this._about.textContent = about;
  };

  setUserAvatar (avatar){
    this._avatar.src = avatar 
  }
}
