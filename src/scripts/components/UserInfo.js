export default class UserInfo{
  constructor(hero, aboutHero, avatar){
    this._hero = hero
    this._aboutHero = aboutHero
    this._avatar = avatar
  }

  getUserInfo() {
    const data = {
      hero: this._hero.textContent,
      aboutHero: this._aboutHero.textContent,
    }
    return data;
  }

  setUserInfo (hero, aboutHero){
    this._hero.textContent = hero;
    this._aboutHero.textContent = aboutHero;
  };
}
