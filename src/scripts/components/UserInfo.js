export default class UserInfo{
  constructor({data}){
    this._user = data.name
    this._about = data.about
    this._avatar = data.avatar
    id
  }

  getUserInfo() {
    const info = {
      name: this._user.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      id = this._id
    }
    return info;
  }

  setUserInfo (data){
    this._user.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar
    this._id = id
  };
}
