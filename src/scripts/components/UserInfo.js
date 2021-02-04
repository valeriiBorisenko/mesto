export default class UserInfo{
  constructor(hero, aboutHero){
    this._hero = hero
    this._aboutHero = aboutHero
  }

  getUserInfo(heroInput, aboutHeroInput) {
    heroInput.value = this._hero.textContent;
    aboutHeroInput.value = this._aboutHero.textContent;

  }

  setUserInfo (heroInput, aboutHeroInput){
    this._hero.textContent = heroInput.value;
    this._aboutHero.textContent = aboutHeroInput.value;
  };
}