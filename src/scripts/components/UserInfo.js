export default class UserInfo{
  constructor(data){
    this._user = data.name
    this._about = data.about
    this._avatar = data.avatar
    this._id = data._id
    this._cohort = data.cohort
  }

  getUserInfo() {
    const info = {
      user: this._user.textContent,
      about: this._about.textContent,
    }
    return info;
  }

  setUserInfo (data){
    this._user.textContent = data.name;
    this._about.textContent = data.about;
  };
}
